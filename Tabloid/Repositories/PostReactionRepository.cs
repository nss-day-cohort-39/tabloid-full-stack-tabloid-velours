using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostReactionRepository
    {

        private readonly ApplicationDbContext _context;

        public PostReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostReaction> GetAll()
        {
            return _context.PostReaction.ToList();
        }

        public PostReaction GetByPostReactionId(int id)
        {
            return _context.PostReaction
               .FirstOrDefault(pr => pr.Id == id);
        }

        public void Add(PostReaction pr)
        {
            _context.Add(pr);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pr = GetByPostReactionId(id);
            _context.PostReaction.Remove(pr);
            _context.SaveChanges();
        }
    }
}
