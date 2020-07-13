using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public CommentController(ApplicationDbContext context)
        {
            _commentRepository = new CommentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        [HttpGet("{postId}")]
        public IActionResult GetAllCommentsByPostId(int postId)
        {
            return Ok(_commentRepository.GetCommentByPostId(postId));
        }

        [HttpGet("id/{id}")]
        public IActionResult GetCommentsById(int id)
        {
            return Ok(_commentRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Comment(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            comment.UserProfileId = currentUserProfile.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut]
        public IActionResult EditComment(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            comment.UserProfileId = currentUserProfile.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Update(comment);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Comment(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();

        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
