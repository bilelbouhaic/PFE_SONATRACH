using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Configurations;
using api.Dtos.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly ILogger<AuthManagementController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;  // Ajoutez cette ligne
        private readonly JwtConfig _jwtConfig;

        private readonly List<string> _validRoles = new List<string> { "Fiscaliste", "Admin", "User" };

        public AuthManagementController(
            ILogger<AuthManagementController> logger,
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,  // Ajoutez cette ligne
            IOptionsMonitor<JwtConfig> optionMonitor
        )
        {
            _logger = logger;
            _userManager = userManager;
            _roleManager = roleManager;  // Ajoutez cette ligne
            _jwtConfig = optionMonitor.CurrentValue;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var emailExist = await _userManager.FindByEmailAsync(requestDto.Email);
                if (emailExist != null)
                    return BadRequest("Email already exists");

                var newUser = new IdentityUser()
                {
                    Email = requestDto.Email,
                    UserName = requestDto.Email
                };

                var isCreated = await _userManager.CreateAsync(newUser, requestDto.Password);
                if (isCreated.Succeeded)
                {
                    var role = string.IsNullOrEmpty(requestDto.Role) ? "Fiscaliste" : requestDto.Role;

                    if (!_validRoles.Contains(role))
                        return BadRequest("Invalid role");

                    var roleExist = await _roleManager.RoleExistsAsync(role);  // Ajoutez cette ligne
                    if (!roleExist)  // Ajoutez cette ligne
                    {  // Ajoutez cette ligne
                        await _roleManager.CreateAsync(new IdentityRole(role));  // Ajoutez cette ligne
                    }  // Ajoutez cette ligne

                    await _userManager.AddToRoleAsync(newUser, role);

                    var token = await GenerateJwtToken(newUser, role);
                    return Ok(new RegistrationRequestResponse()
                    {
                        Result = true,
                        Token = token
                    });
                }
                return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());
            }

            return BadRequest("Invalid request payload");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest requestDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(requestDto.Email);
                if (existingUser == null)
                    return BadRequest("Invalid authentication");

                var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, requestDto.Password);
                if (isPasswordValid)
                {
                    var userRoles = await _userManager.GetRolesAsync(existingUser);
                    var token = await GenerateJwtToken(existingUser, userRoles.FirstOrDefault());
                    return Ok(new LoginRequestResponse()
                    {
                        Token = token,
                        Result = true
                    });
                }
                return BadRequest("Invalid request payload");
            }
            return BadRequest("Invalid request payload");
        }

        private async Task<string> GenerateJwtToken(IdentityUser user, string role)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);
            return jwtToken;
        }
    }
}
