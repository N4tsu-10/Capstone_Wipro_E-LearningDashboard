// Controllers/QuizzesController.cs
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
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly ICourseService _courseService;

        public QuizzesController(IQuizService quizService, ICourseService courseService)
        {
            _quizService = quizService;
            _courseService = courseService;
        }

        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetQuizzesByCourse(int courseId)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            // Check if user is enrolled in the course
            bool isEnrolled = await _courseService.IsUserEnrolledAsync(userId, courseId);
            if (!isEnrolled)
                return Unauthorized("You must be enrolled in the course to access quizzes");

            var quizzes = await _quizService.GetQuizzesByCourseIdAsync(courseId, userId);
            return Ok(quizzes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuizDetails(int id)
        {
            var quiz = await _quizService.GetQuizDetailsAsync(id);
            if (quiz == null)
                return NotFound();

            return Ok(quiz);
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitQuiz([FromBody] QuizSubmissionDto submissionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var result = await _quizService.SubmitQuizAsync(userId, submissionDto);
            
            if (result == null)
                return BadRequest("Failed to submit quiz");

            return Ok(result);
        }
    }
}