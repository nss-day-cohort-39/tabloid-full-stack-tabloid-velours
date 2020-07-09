using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetCommentByPostId(int postId)
        {
            return _context.Comment
                       .Include(c => c.Post)
                       .Where(p => p.Id == postId)
                       .ToList();


        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    
}
}
