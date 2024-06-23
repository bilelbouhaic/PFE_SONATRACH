using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
{
    [HttpGet("validate-token")]
    [Authorize]
    public IActionResult ValidateToken()
    {
        return Ok(new { isValid = true });
    }
}
}