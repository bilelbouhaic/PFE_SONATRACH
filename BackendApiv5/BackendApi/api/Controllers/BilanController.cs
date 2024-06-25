using System;
using System.Globalization;
using System.IO;
using System.Linq;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BilanController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public BilanController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("GenerateBilanPDF/{date}")]
        public IActionResult GenerateBilanPDF(string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var selectedDate))
            {
                return BadRequest("Invalid date format. Please use yyyy-MM-dd.");
            }

            var document = new Document(PageSize.A4);
            document.SetMargins(25f, 25f, 30f, 30f);

            using (var memoryStream = new MemoryStream())
            {
                var writer = PdfWriter.GetInstance(document, memoryStream);
                document.Open();

                var titleFont = FontFactory.GetFont("Arial", 16, Font.BOLD);
                var tableFont = FontFactory.GetFont("Arial", 10, Font.NORMAL);

                var title = new Paragraph("Declarations Redevance", titleFont)
                {
                    Alignment = Element.ALIGN_CENTER
                };
                var redevance = new Paragraph("Redevance", titleFont)
                {
                    Alignment = Element.ALIGN_CENTER
                };
                var perimetre = new Paragraph("Perimetre Sonatrach seule", titleFont)
                {
                    Alignment = Element.ALIGN_CENTER
                };
                var generatedOn = new Paragraph($"Generated on: {DateTime.Now}", FontFactory.GetFont("Arial", 10, Font.NORMAL))
                {
                    Alignment = Element.ALIGN_CENTER
                };

                document.Add(title);
                document.Add(redevance);
                document.Add(perimetre);
                document.Add(generatedOn);

                document.Add(new Paragraph("\n"));

                var previousDate = selectedDate.AddMonths(-1);

                var declarations = _context.declarationRedevances
                    .Include(d => d.perimetre)
                    .Where(d => d.dateRdv == selectedDate || d.dateRdv == previousDate)
                    .ToList();

                var groupedDeclarations = declarations
                    .GroupBy(d => d.perimetre.nomPerimetre)
                    .ToList();

                var table = new PdfPTable(6) // Changed from 5 to 6 columns
                {
                    WidthPercentage = 100,
                    SpacingBefore = 10f,
                    SpacingAfter = 10f
                };

                var headerFont = FontFactory.GetFont("Arial", 10, Font.BOLD);
                var headerBackgroundColor = new BaseColor(238, 239, 251);

                AddHeaderCellToTable(table, "Périmètre", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, $"Montant le {previousDate:yyyy-MM-dd}", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, $"Provisoire le {previousDate:yyyy-MM-dd}", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, $"Montant le {selectedDate:yyyy-MM-dd}", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, "Solde à verser", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, "Solde à récupérer", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);

                decimal totalPreviousDate = 0;
                decimal totalPreviousProvisoire = 0; // Added total for provisoire
                decimal totalSelectedDate = 0;
                decimal totalSoldeVerser = 0;
                decimal totalSoldeRecuperer = 0;

                foreach (var group in groupedDeclarations)
                {
                    AddCellToTable(table, group.Key, tableFont);

                    var declarationPreviousDate = group.FirstOrDefault(d => d.dateRdv == previousDate);
                    var declarationPreviousProvisoire = group.FirstOrDefault(d => d.dateRdv == previousDate && d.typeRdv == "Provisoire");
                    var declarationSelectedDate = group.FirstOrDefault(d => d.dateRdv == selectedDate);

                    var montantPreviousDate = declarationPreviousDate?.montantRdv ?? 0;
                    var montantPreviousProvisoire = declarationPreviousProvisoire?.montantRdv ?? 0; // Amount for provisoire
                    var montantSelectedDate = declarationSelectedDate?.montantRdv ?? 0;

                    // Calculation based on the provided formula
                    var solde = (montantPreviousDate - montantPreviousProvisoire) + montantSelectedDate;

                    decimal soldeVerser = solde > 0 ? solde : 0;
                    decimal soldeRecuperer = solde < 0 ? -solde : 0;

                    AddCellToTable(table, montantPreviousDate.ToString(), tableFont);
                    AddCellToTable(table, montantPreviousProvisoire.ToString(), tableFont); // Added cell for provisoire
                    AddCellToTable(table, montantSelectedDate.ToString(), tableFont);
                    AddCellToTable(table, soldeVerser.ToString(), tableFont);
                    AddCellToTable(table, soldeRecuperer.ToString(), tableFont);

                    totalPreviousDate += montantPreviousDate;
                    totalPreviousProvisoire += montantPreviousProvisoire; // Add to total provisoire
                    totalSelectedDate += montantSelectedDate;
                    totalSoldeVerser += soldeVerser;
                    totalSoldeRecuperer += soldeRecuperer;
                }

                AddCellToTable(table, "Total", tableFont);
                AddCellToTable(table, totalPreviousDate.ToString(), tableFont);
                AddCellToTable(table, totalPreviousProvisoire.ToString(), tableFont); // Added total cell for provisoire
                AddCellToTable(table, totalSelectedDate.ToString(), tableFont);
                AddCellToTable(table, totalSoldeVerser.ToString(), tableFont);
                AddCellToTable(table, totalSoldeRecuperer.ToString(), tableFont);

                document.Add(table);

                document.Close();

                var pdfBytes = memoryStream.ToArray();

                return File(pdfBytes, "application/pdf", "bilan_declarations.pdf");
            }
        }

        private void AddCellToTable(PdfPTable table, string text, Font font)
        {
            var cell = new PdfPCell(new Phrase(text, font))
            {
                Padding = 5f
            };
            table.AddCell(cell);
        }

        private void AddHeaderCellToTable(PdfPTable table, string text, Font font, BaseColor backgroundColor, int alignment)
        {
            var cell = new PdfPCell(new Phrase(text, font))
            {
                Padding = 5f,
                BackgroundColor = backgroundColor,
                HorizontalAlignment = alignment
            };
            table.AddCell(cell);
        }
    }
}
