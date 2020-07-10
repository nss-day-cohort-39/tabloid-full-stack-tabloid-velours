using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "admin")
            {
                return Unauthorized();
            }
            _categoryRepository.Add(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }
    }
}
