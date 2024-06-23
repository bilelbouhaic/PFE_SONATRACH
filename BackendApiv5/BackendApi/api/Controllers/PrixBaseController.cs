using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.PrixBase;  // DTO for PrixBase
using api.Models;  // Domain models
using api.Data;  // Data context

namespace api.Controllers
{
    // Controller definition for "api/prixbase"
    [Route("api/[controller]")]
    [ApiController]
    public class PrixBaseController : ControllerBase
    {
        // Data context for interacting with the database
        private readonly ApplicationDBContext _context;

        // Constructor for dependency injection of the data context
        public PrixBaseController(ApplicationDBContext context)
        {
            _context = context;
        }

        // POST endpoint to create multiple PrixBase entities
        // The endpoint URL is "api/prixbase"
        [HttpPost]
        public async Task<IActionResult> PostMultiplePrixBase([FromBody] List<PrixBaseDto> dtos)
        {
            // Check if the incoming request data is valid
            if (!ModelState.IsValid)
            {
                // Return a 400 Bad Request if validation fails
                return BadRequest(ModelState);
            }

            // Create a list to hold the new entities
            var newPrixBases = new List<PrixBase>();

            // Convert each DTO to a PrixBase entity and add to the list
            foreach (var dto in dtos)
            {
                var newPrixBase = new PrixBase
                {
                    prixBase = dto.PrixBase,
                    dateModificationPb = DateOnly.FromDateTime(DateTime.Now),
                    ProduitId = dto.ProduitId
                };

                newPrixBases.Add(newPrixBase);
            }

            // Add the list of new entities to the data context
            _context.prixBases.AddRange(newPrixBases);

            // Save changes asynchronously
            await _context.SaveChangesAsync();

            // Return a response indicating successful creation of multiple entities
            return Ok(newPrixBases);  // Return the created objects with HTTP 200 OK
        }

        // GET endpoint to retrieve a single PrixBase by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<PrixBase>> GetPrixBaseById(int id)
        {
            var prixBase = await _context.prixBases.FindAsync(id);

            if (prixBase == null)
            {
                return NotFound();  // Return 404 if not found
            }

            return prixBase;  // Return the found entity
        }
    }
}
