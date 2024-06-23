using api.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TrpGetController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public TrpGetController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAggregatedDeclarations()
    {
        var result = _context.trps
            .GroupBy(d => d.dateTrp)
            .Select(g => new
            {
                DateTrp = g.Key,
                 AverageTauxTrp = g.Average(d => d.TauxTrp),
             
                TotalMontantTrp = g.Sum(d => d.montantTrp),
                
            })
            .Take(1000)
            .ToList();

        return Ok(result);
    }
}
