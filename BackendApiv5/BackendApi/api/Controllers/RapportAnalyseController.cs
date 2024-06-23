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
    public class RapportAnalyseController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public RapportAnalyseController(ApplicationDBContext context)
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

                var titleFont = FontFactory.GetFont("Arial", 16, Font.BOLD); // Taille de police réduite
                var tableFont = FontFactory.GetFont("Arial", 10, Font.NORMAL); // Police plus petite pour le tableau

                // Titres centrés dans le PDF
                var title = new Paragraph("Rapport d’analyse de production", titleFont);
                
                var perimetre = new Paragraph("Date de production : 2017-06-10", titleFont);
               
                var generatedOn = new Paragraph($"Generer le  : {DateTime.Now}");

                 var intro = new Paragraph("Introduction : Ce rapport analyse les données de différentes sources API pour fournir des insights sur");
               

                document.Add(title);
                document.Add(perimetre);
                document.Add(generatedOn);
                  document.Add(intro);

                document.Add(new Paragraph("\n")); // Space after the title

                // Calculer la date un mois avant la date sélectionnée
                var previousDate = selectedDate.AddMonths(-1);

                // Filtrer les déclarations par les dates spécifiées
                var declarations = _context.declarationRedevances
                    .Include(d => d.perimetre)
                    .Where(d => d.dateRdv == selectedDate || d.dateRdv == previousDate)
                    .ToList();

                // Grouper les déclarations par périmètre
                var groupedDeclarations = declarations
                    .GroupBy(d => d.perimetre.nomPerimetre)
                    .ToList();

                // Créer la table avec cinq colonnes: Périmètre, Montant pour previousDate, Montant pour selectedDate, Solde à verser, Solde à récupérer
                var table = new PdfPTable(5)
                {
                    WidthPercentage = 100, // Utilisation de la pleine largeur de la page
                    SpacingBefore = 10f, // Espacement avant le tableau
                    SpacingAfter = 10f // Espacement après le tableau
                };

                // Ajouter les en-têtes de colonne avec une police plus petite et centrés
                var headerFont = FontFactory.GetFont("Arial", 10, Font.BOLD);
                var headerBackgroundColor = new BaseColor(238, 239, 251); // #EEEFFB

                AddHeaderCellToTable(table, "Périmètre", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, $"Montant le {previousDate:yyyy-MM-dd}", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, $"Montant le {selectedDate:yyyy-MM-dd}", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, "Solde à verser", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);
                AddHeaderCellToTable(table, "Solde à récupérer", headerFont, headerBackgroundColor, Element.ALIGN_CENTER);

                // Variables pour les totaux
                decimal totalPreviousDate = 0;
                decimal totalSelectedDate = 0;
                decimal totalSoldeVerser = 0;
                decimal totalSoldeRecuperer = 0;

                // Ajouter les données au tableau
                foreach (var group in groupedDeclarations)
                {
                    AddCellToTable(table, group.Key, tableFont); // Nom du périmètre

                    // Trouver les déclarations pour chaque date
                    var declarationPreviousDate = group.FirstOrDefault(d => d.dateRdv == previousDate);
                    var declarationSelectedDate = group.FirstOrDefault(d => d.dateRdv == selectedDate);

                    // Ajouter le montant ou "0" si aucune déclaration trouvée pour la date
                    var montantPreviousDate = declarationPreviousDate?.montantRdv ?? 0;
                    var montantSelectedDate = declarationSelectedDate?.montantRdv ?? 0;
                    var solde = montantSelectedDate - montantPreviousDate;

                    decimal soldeVerser = solde > 0 ? solde : 0;
                    decimal soldeRecuperer = solde < 0 ? -solde : 0;

                    AddCellToTable(table, montantPreviousDate.ToString(), tableFont);
                    AddCellToTable(table, montantSelectedDate.ToString(), tableFont);
                    AddCellToTable(table, soldeVerser.ToString(), tableFont);
                    AddCellToTable(table, soldeRecuperer.ToString(), tableFont);

                    // Ajouter aux totaux
                    totalPreviousDate += montantPreviousDate;
                    totalSelectedDate += montantSelectedDate;
                    totalSoldeVerser += soldeVerser;
                    totalSoldeRecuperer += soldeRecuperer;
                }

                // Ajouter la ligne des totaux
                AddCellToTable(table, "Total", tableFont);
                AddCellToTable(table, totalPreviousDate.ToString(), tableFont);
                AddCellToTable(table, totalSelectedDate.ToString(), tableFont);
                AddCellToTable(table, totalSoldeVerser.ToString(), tableFont);
                AddCellToTable(table, totalSoldeRecuperer.ToString(), tableFont);

                document.Add(table); // Ajouter le tableau au document

                document.Close(); // Finaliser le document

                var pdfBytes = memoryStream.ToArray();

                return File(pdfBytes, "application/pdf", "bilan_declarations.pdf");
            }
        }

        // Méthode auxiliaire pour ajouter des cellules au tableau avec des marges et une police spécifique
        private void AddCellToTable(PdfPTable table, string text, Font font)
        {
            var cell = new PdfPCell(new Phrase(text, font))
            {
                Padding = 5f // Padding de 5 points pour chaque cellule
            };
            table.AddCell(cell);
        }

        // Méthode auxiliaire pour ajouter des cellules d'en-tête au tableau avec des marges, une police spécifique, un fond de couleur et alignement centré
        private void AddHeaderCellToTable(PdfPTable table, string text, Font font, BaseColor backgroundColor, int alignment)
        {
            var cell = new PdfPCell(new Phrase(text, font))
            {
                Padding = 5f, // Padding de 5 points pour chaque cellule
                BackgroundColor = backgroundColor, // Couleur de fond pour les en-têtes
                HorizontalAlignment = alignment // Alignement centré
            };
            table.AddCell(cell);
        }
    }
}
