using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using api.Dtos.Redevance;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeclarationRedevanceController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public DeclarationRedevanceController(ApplicationDBContext context)
        {
            _context = context;
            
        }

        [HttpPost("InsertDeclarationsWithSum")]
        public IActionResult InsertDeclarationsWithSum( [FromBody] RedevanceDto dto)
        {
            var targetDate = dto.dateRdv;
            var targetType = dto.typeRdv;

            // Group redevances by perimetreId to ensure unique identifiers
            var redevanceGroups = _context.productions
                .Where(r => r.typeRdv == targetType && r.dateRdv == targetDate)
                .GroupBy(r => r.perimetreId)
                .ToList();

            var declarations = new List<DeclarationRedevance>();

            foreach (var group in redevanceGroups)
            {
                var totalProductionValorise = group.Sum(r => r.ProductionValorise);
                var totalCoutTransport = group.Sum(r => r.CoutTransport);

                var perimetreId = group.Key;
                var perimetre = _context.perimetres.FirstOrDefault(p => p.idPerimetre == perimetreId);

                // Retrieve the associated zone ID for each perimeter
                var zoneId = perimetre.ZoneId;

                // Determine the correct TauxRdv based on the zone ID and production value
                var tauxRdv = GetTauxRedv(totalProductionValorise, zoneId);

                // Calculate BaseRdv and montantRdv for each group
                var baseRdv = totalProductionValorise - totalCoutTransport;
                var montantRdv = baseRdv * tauxRdv;

                var newDeclaration = new DeclarationRedevance
                {
                    TauxRdv = tauxRdv,
                    BaseRdv = baseRdv,
                    montantRdv = montantRdv,
                    typeRdv = targetType,
                    dateRdv = targetDate,
                    perimetreId = perimetreId,
                };

                declarations.Add(newDeclaration);
            }

            _context.declarationRedevances.AddRange(declarations);
            _context.SaveChanges();

            return Ok(declarations);
        }

        // Helper method to determine the correct TauxRdv based on zone ID and production value
        private decimal GetTauxRedv(decimal totalProductionValorise, int zoneId)
        {
            // Define rate structures based on zone IDs
            Dictionary<int, decimal[]> zoneRates = new Dictionary<int, decimal[]>
            {
                { 1, new decimal[] { 0.055m, 0.105m, 0.155m, 0.12m } }, // North Zone
                { 2, new decimal[] { 0.08m, 0.13m, 0.18m, 0.145m } }, // South Zone
                { 3, new decimal[] { 0.11m, 0.16m, 0.2m, 0.17m } }, // East Zone
                { 4, new decimal[] { 0.125m, 0.20m, 0.23m, 0.2m } } // West Zone
            };

            if (!zoneRates.TryGetValue(zoneId, out var rates))
            {
                rates = new decimal[] { 0.055m, 0.105m, 0.155m, 0.12m }; // Default rates if unknown zone ID
            }

            // Apply the correct rate based on production thresholds
            if (totalProductionValorise < 20000)
            {
                return rates[0];
            }
            else if (totalProductionValorise >= 20000 && totalProductionValorise < 50000)
            {
                return rates[1];
            }
            else if (totalProductionValorise >= 50000 && totalProductionValorise < 100000)
            {
                return rates[2];
            }
            else
            {
                return rates[3];
            }
        }
    }
}
