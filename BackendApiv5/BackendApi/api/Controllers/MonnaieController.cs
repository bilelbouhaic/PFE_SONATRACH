using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Monnaie;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonnaieController :ControllerBase
    {
        // Data context for interacting with the database
        private readonly ApplicationDBContext _context;

        // Constructor for dependency injection of the data context
        public MonnaieController(ApplicationDBContext context)
        {
            _context = context;
        }

        // POST endpoint to create multiple PrixBase entities
        // The endpoint URL is "api/prixbase"
        [HttpPost]
        public async Task<IActionResult> PostMultipleMonnaie([FromBody] List<MonnaieDto> dtos)
        {
            // Check if the incoming request data is valid
            if (!ModelState.IsValid)
            {
                // Return a 400 Bad Request if validation fails
                return BadRequest(ModelState);
            }

            // Create a list to hold the new entities
            var newMonnaies = new List<Monnaie>();

            // Convert each DTO to a PrixBase entity and add to the list
            foreach (var dto in dtos)
            {
                var newMonnaie = new Monnaie
                {
                    tauxChange = dto.tauxChange,
                    dateModificationMonnaie = DateTime.Now,
                  
                };

                newMonnaies.Add(newMonnaie);
            }

            // Add the list of new entities to the data context
            _context.monnaies.AddRange(newMonnaies);

            // Save changes asynchronously
            await _context.SaveChangesAsync();

            // Return a response indicating successful creation of multiple entities
            return Ok(newMonnaies);  // Return the created objects with HTTP 200 OK
        }

      
    }
}
