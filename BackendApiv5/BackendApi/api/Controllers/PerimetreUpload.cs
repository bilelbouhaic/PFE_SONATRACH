using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using api.Models;
using api.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerimetreUpload : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly string _fileUploadDirectory;
        private readonly Random _random;

        public PerimetreUpload(ApplicationDBContext context)
        {
            _context = context;
            _fileUploadDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "uploads");
            if (!Directory.Exists(_fileUploadDirectory))
            {
                Directory.CreateDirectory(_fileUploadDirectory);
            }
            _random = new Random(); // Initialize the Random object
        }

        [HttpPost("extract")]
        public async Task<IActionResult> ExtractDataFromExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Save the uploaded file
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_fileUploadDirectory, fileName);
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error saving the file: {ex.Message}" });
            }

            // Ensure the file was saved properly
            if (!System.IO.File.Exists(filePath))
            {
                return BadRequest("File not saved properly.");
            }

            // Process the Excel file
            var newPerimetres = new List<Perimetre>();
            try
            {
                using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[3];
                        if (worksheet == null)
                        {
                            return BadRequest("Worksheet not found.");
                        }

                        for (int i = 10; i <= worksheet.Dimension.End.Row; i++)
                        {
                            var nomPerimetreText = worksheet.Cells[i, 2].Text;
                            if (string.IsNullOrWhiteSpace(nomPerimetreText))
                            {
                                continue; // Skip invalid data
                            }

                            // Generate a random ZoneId between 1 and 4
                            var zoneId = _random.Next(1, 5); // The upper bound is exclusive, so 5 gives 1-4

                            var perimetre = new Perimetre
                            {
                                nomPerimetre = nomPerimetreText,
                                associative = true,
                                qteGaz = 70,
                                ZoneId = zoneId, // Use the randomly generated value
                                wilaya =1
                            };

                            newPerimetres.Add(perimetre);
                        }
                    }
                }

                // Insert into the database
                _context.perimetres.AddRange(newPerimetres);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Data extracted and inserted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"An error occurred while processing the file: {ex.Message}" });
            }
        }
    }
}
