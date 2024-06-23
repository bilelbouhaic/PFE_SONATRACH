using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Data;
using api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace api.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionInfoController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ProductionInfoController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("getProductionMonnaie")]
        public IActionResult GetProductionMonnaie()
        {
            var latestMonnaie = _context.monnaies
                                       .OrderByDescending(m => m.dateModificationMonnaie)
                                       .FirstOrDefault();

            // Fetch PrixBase records with their related Produit data
            var prixBases = _context.prixBases
                                    .Include(pb => pb.Produit)  // Include the Produit data
                                    .ToList();
                                     // Fetch PrixBase records with their related Produit data
          
            // Get prices based on the product name with null-checking
            decimal prixBPetrole = prixBases.LastOrDefault(pb => pb.Produit?.nomProduit == "petrole")?.prixBase ?? 0;
            decimal prixBGaz = prixBases.LastOrDefault(pb => pb.Produit?.nomProduit == "gaz")?.prixBase ?? 0;
            decimal prixBCondensat = prixBases.LastOrDefault(pb => pb.Produit?.nomProduit == "condensat")?.prixBase ?? 0;
            decimal prixBGpl = prixBases.LastOrDefault(pb => pb.Produit?.nomProduit == "GPL")?.prixBase ?? 0;

             decimal Date = prixBases.LastOrDefault(pb => pb.Produit?.nomProduit == "GPL")?.prixBase ?? 0;

            // Prepare the DTO with the retrieved values
            var response = new ProductionMonnaieDto
            {
                TauxChange = latestMonnaie.tauxChange,
                PrixBPetrole = prixBPetrole,
                PrixBGaz = prixBGaz,
                PrixBCondensat = prixBCondensat,
                PrixBGpl = prixBGpl

            };

            return Ok(response);  // Return the DTO
        }
    }
}
