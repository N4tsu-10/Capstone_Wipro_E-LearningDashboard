// Controllers/AuthController.cs
using server.DTOs;
using server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerDto)
        {
            // Validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if user exists
            if (await _authService.UserExistsAsync(registerDto.Username, registerDto.Email))
                return BadRequest("Username or email already exists");

            // Register user
            var result = await _authService.RegisterAsync(registerDto);
            if (result == null)
                return BadRequest("Failed to register user");

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginDto)
        {
            // Validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Login user
            var result = await _authService.LoginAsync(loginDto);
            if (result == null)
                return Unauthorized("Invalid username or password");

            return Ok(result);
        }
    }
}



