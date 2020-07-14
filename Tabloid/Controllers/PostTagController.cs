using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly PostTagRepository _postTagRepository;
       
        public PostTagController(ApplicationDbContext context)
        {
            _postTagRepository = new PostTagRepository(context);
           
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postTagRepository.GetAll());
        }

        [HttpGet("getbypost/{postId}")]
        public IActionResult GetByPostId(int postId)
        {
            var postTags = _postTagRepository.GetByPostId(postId);
                        
            return Ok(postTags);
        }
        [HttpGet("getbytag/{tagId}")]
        public IActionResult GetByTagId(int tagId)
        {
            var postTags = _postTagRepository.GetByTagId(tagId);

            return Ok(postTags);
        }

        //[HttpPost]
        //public IActionResult Post(Post post)
        //{
        //    var currentUser = GetCurrentUserProfile();
        //    post.UserProfileId = currentUser.Id;
        //    _postRepository.Add(post);
        //    return CreatedAtAction("Get", new { id = post.Id }, post);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Post post)
        //{
        //    if (id != post.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _postRepository.Update(post);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _postRepository.Delete(id);
        //    return NoContent();
        //}
    }
}
