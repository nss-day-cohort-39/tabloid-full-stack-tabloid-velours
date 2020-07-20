using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly ReactionRepository _reactionRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public ReactionController(ApplicationDbContext context)
        {
            _reactionRepository = new ReactionRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }

        [HttpGet("emojis")]
        public IActionResult GetEmojis()
        {
            return Ok(_reactionRepository.GetAllEmojis());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var react = _reactionRepository.GetById(id);
            if (react != null)
            {
                NotFound();
            }
            return Ok(react);
        }

        [HttpPost]
        public IActionResult Post(Reaction react)
        {

            _reactionRepository.Add(react);
            return CreatedAtAction(nameof(Get), new { id = react.Id }, react);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Reaction react)
        {
            if (id != react.Id)
            {
                return BadRequest();
            }

            _reactionRepository.Update(react);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _reactionRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
