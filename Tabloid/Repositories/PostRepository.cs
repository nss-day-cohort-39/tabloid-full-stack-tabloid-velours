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
                           .Where(p => p.IsApproved == true && p.PublishDateTime <= today)
                           .OrderByDescending(p => p.PublishDateTime)
                           //.Include(p => p.Category)
                           .ToList();
        }

        public List<Post> GetAllCUPosts(int id)
        {
            DateTime today = DateTime.Now;
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Where(p => p.IsApproved == true && p.UserProfileId == id)
                           .OrderByDescending(p => p.CreateDateTime)
                           //.Include(p => p.Category)
                           .ToList();
        }
    }
}
