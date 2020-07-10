using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyPostsController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _upRepository;
        public MyPostsController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _upRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_postRepository.GetAllCUPosts(currentUser.Id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _upRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
