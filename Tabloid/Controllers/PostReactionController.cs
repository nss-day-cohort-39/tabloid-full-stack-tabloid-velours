using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly PostReactionRepository _postReactionRepository;

        public PostReactionController(ApplicationDbContext context)
        {
            _postReactionRepository = new PostReactionRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postReactionRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return CreatedAtAction("Get", new { id = postReaction.Id }, postReaction);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postReactionRepository.Delete(id);
            return NoContent();
        }
    }
}
