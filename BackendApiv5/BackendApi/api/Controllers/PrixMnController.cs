using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.PrixBase;  // DTO for PrixBase
using api.Models;  // Domain models
using api.Data;
using api.Dtos.PrixMn;  // Data context

namespace api.Controllers
{
    // Controller definition for "api/prixbase"
    [Route("api/[controller]")]
    [ApiController]
    public class PrixMnController : ControllerBase
    {
        // Data context for interacting with the database
        private readonly ApplicationDBContext _context;

        // Constructor for dependency injection of the data context
        public PrixMnController(ApplicationDBContext context)
        {
            _context = context;
        }

        // POST endpoint to create multiple PrixBase entities
        // The endpoint URL is "api/prixbase"
        [HttpPost]
        public async Task<IActionResult> PostMultiplePrixMn([FromBody] List<PrixMnDto> dtos)
        {
            // Check if the incoming request data is valid
            if (!ModelState.IsValid)
            {
                // Return a 400 Bad Request if validation fails
                return BadRequest(ModelState);
            }

            // Create a list to hold the new entities
            var newPrixMns = new List<PrixMn>();

            // Convert each DTO to a PrixBase entity and add to the list
            foreach (var dto in dtos)
            {
                var newPrixMn = new PrixMn
                {
                    prixMn = dto.prixMn,
                    datemodificationPmn =DateOnly.FromDateTime(DateTime.Now),
                    ProduitId = dto.ProduitId
                };

                newPrixMns.Add(newPrixMn);
            }

            // Add the list of new entities to the data context
            _context.prixMns.AddRange(newPrixMns);

            // Save changes asynchronously
            await _context.SaveChangesAsync();

            // Return a response indicating successful creation of multiple entities
            return Ok(newPrixMns);  // Return the created objects with HTTP 200 OK
        }

        
    }
}
