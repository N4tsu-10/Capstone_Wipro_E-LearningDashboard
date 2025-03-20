// Controllers/CoursesController.cs
using server.DTOs;
using server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            if (course == null)
                return NotFound();

            return Ok(course);
        }

        [HttpGet("enrolled")]
        public async Task<IActionResult> GetEnrolledCourses()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var courses = await _courseService.GetUserEnrolledCoursesAsync(userId);
            return Ok(courses);
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollCourse([FromBody] EnrollCourseDto enrollDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var enrollment = await _courseService.EnrollCourseAsync(userId, enrollDto.CourseId);
            
            if (enrollment == null)
                return BadRequest("Failed to enroll in course");

            return Ok(enrollment);
        }
    }
}