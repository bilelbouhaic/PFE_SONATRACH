using api.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class DeclarationsController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public DeclarationsController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAggregatedDeclarations()
    {
        var result = _context.declarationRedevances
            .GroupBy(d => d.dateRdv)
            .Select(g => new
            {
                DateRdv = g.Key,
                 AverageTauxRdv = g.Average(d => d.TauxRdv),
                TotalBaseRdv = g.Sum(d => d.BaseRdv),
                TotalMontantRdv = g.Sum(d => d.montantRdv),
                TypesRdv = g.Select(d => d.typeRdv).Distinct()
            })
            .Take(1000)
            .ToList();

        return Ok(result);
    }
}
