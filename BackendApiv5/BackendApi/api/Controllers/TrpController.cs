using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using api.Dtos.Redevance;
using api.Dtos;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrpController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public TrpController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpPost("InsertTRP")]
        public IActionResult InsertTRP([FromBody] TrpDto dto)
        {
            var targetDate = dto.dateRdv;
            var targetTaux = dto.tauxRdv;

            // Filter redevances by the target date
            var redevances = _context.declarationRedevances
                .Where(r => r.dateRdv == targetDate)
                .ToList();

            // Get the latest investments by type
            var latestInvestments = _context.investissements
                .GroupBy(i => i.typeInvest)
                .Select(g => g.OrderByDescending(i => i.dateInvet).FirstOrDefault())
                .ToList();

            var trpss = new List<Trp>();

            foreach (var redevance in redevances)
            {
                // Calculate adjusted baseRdv by subtracting the latest investments
                var adjustedBaseRdv = redevance.BaseRdv;

                foreach (var investment in latestInvestments)
                {
                    adjustedBaseRdv -= investment.montantInvest;
                }

                // Ensure adjustedBaseRdv does not go negative
                // adjustedBaseRdv = Math.Max(adjustedBaseRdv, 0);

                // Calculate the montantTrp after adjustment
                var montantTrp = CalculateMontantTrp(adjustedBaseRdv, targetTaux);

                var newTrp = new Trp
                {
                    TauxTrp = targetTaux,
                    montantTrp = montantTrp,
                    dateTrp = redevance.dateRdv,
                    perimetreId = redevance.perimetreId
                };

                trpss.Add(newTrp);
            }

            _context.trps.AddRange(trpss);
            _context.SaveChanges();

            return Ok(trpss);
        }

        private decimal CalculateMontantTrp(decimal baseRdv, decimal tauxRdv)
        {
            // Replace this with your actual calculation logic
            return baseRdv * tauxRdv;
        }
    }
}
