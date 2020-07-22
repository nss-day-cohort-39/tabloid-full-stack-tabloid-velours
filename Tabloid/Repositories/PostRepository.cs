using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;
        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Post> GetAll()
        {
            DateTime today = DateTime.Now;
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .Include(p => p.Category)
                           .Where(p => p.IsApproved == true && p.PublishDateTime <= today)
                           .OrderByDescending(p => p.PublishDateTime)
                           .ToList();
        }

        public List<Post> GetAllCUPosts(int id)
        {
            DateTime today = DateTime.Now;
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .Include(p => p.Category)
                           .Where(p => p.IsApproved == true && p.UserProfileId == id)
                           .OrderByDescending(p => p.CreateDateTime)
                           .ToList();
        }

   
        public Post GetById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.CommentList)
                           .ThenInclude(c => c.UserProfile)
                           .Include(p => p.Category)
                           .Include(p=> p.PostTagList)
                           .ThenInclude(pt => pt.Tag)
                           .FirstOrDefault(p => p.Id == id);
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            foreach (var postReaction in _context.PostReaction
               .Where(pr => pr.PostId == post.Id))
            {
                _context.PostReaction.Remove(postReaction);
            }
            _context.Post.Remove(post);
            _context.SaveChanges();
        }
    }
}
