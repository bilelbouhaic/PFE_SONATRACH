using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelUploadController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly string _fileUploadDirectory;

        public ExcelUploadController(ApplicationDBContext context)
        {
            _context = context;
            _fileUploadDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "uploads");
            if (!Directory.Exists(_fileUploadDirectory))
            {
                Directory.CreateDirectory(_fileUploadDirectory);
            }
        }

        // Second step: extract data from the uploaded Excel file
        [HttpPost("extract")]
        public async Task<IActionResult> ExtractDataFromExcel(IFormFile file, [FromForm] string initialDate, [FromForm] string typeRdv)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = Path.Combine(_fileUploadDirectory, file.FileName);

            // Save the file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Now check if the file exists at the given path
            if (!System.IO.File.Exists(filePath))
            {
                return BadRequest("Invalid file path.");
            }

            DateOnly parsedDate;
            if (!DateOnly.TryParse(initialDate, out parsedDate))
            {
                return BadRequest("Invalid date format for initialDate.");
            }

            var prixBPetrole = await _context.prixBases
                .Where(pb => pb.Produit.nomProduit == "Petrole")
                .OrderByDescending(pb => pb.dateModificationPb)
                .Select(pb => pb.prixBase)
                .FirstOrDefaultAsync();

            var prixTtPetrole = await _context.tarifTransports
                .Where(tt => tt.Produit.nomProduit == "Petrole")
                .OrderByDescending(tt => tt.dateModificationTt)
                .Select(tt => tt.tarifTransport)
                .FirstOrDefaultAsync();
                

            var newRedevances = new List<Production>();
            using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    //Petrole
                    for (int i = 2; i <= worksheet.Dimension.End.Row; i++)
                    {
                        if (!decimal.TryParse(worksheet.Cells[i, 1].Text, out var quantiteProduite)) { return BadRequest($"Invalid number format for quantiteProduite at row {i}."); }
                        if (!decimal.TryParse(worksheet.Cells[i, 2].Text, out var expeditionMN)) { return BadRequest($"Invalid number format for expeditionMN at row {i}."); }
                        if (!decimal.TryParse(worksheet.Cells[i, 3].Text, out var expeditionEXP)) { return BadRequest($"Invalid number format for expeditionEXP at row {i}."); }
                        if (!decimal.TryParse(worksheet.Cells[i, 4].Text, out var pallier)) { return BadRequest($"Invalid number format for pallier at row {i}."); }
                        if (!DateTime.TryParse(worksheet.Cells[i, 5].Text, out var dateProduction)) { return BadRequest($"Invalid date format for dateProduction at row {i}."); }

                        var redevance = new Production
                        {
                            ProductionValorise = expeditionEXP * prixBPetrole + expeditionMN * prixBPetrole, // Using prixBPetrole twice as prixMnPetrole is not available
                            qteProduite = quantiteProduite,
                            ProduitId = 1,
                            typeRdv = typeRdv,
                            dateRdv = parsedDate,
                            perimetreId = i,
                            CoutTransport = prixTtPetrole * expeditionMN
                        };


                        newRedevances.Add(redevance);
                    }

                    // Add similar logic for other worksheets

                }
            }

            _context.productions.AddRange(newRedevances);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Data extracted and inserted successfully." });
        }
    }
}
