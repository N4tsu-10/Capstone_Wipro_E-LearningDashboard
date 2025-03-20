// DTOs/LoginUserDto.cs
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class LoginUserDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}