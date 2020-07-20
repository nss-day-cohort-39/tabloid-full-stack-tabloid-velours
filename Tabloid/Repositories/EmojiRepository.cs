using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class EmojiRepository
    {

        private readonly ApplicationDbContext _context;

        public EmojiRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Emoji> GetAll()
        {
            return _context.Emoji
                .ToList();
        }

        public Emoji GetById(int id)
        {
            return _context.Emoji
               .FirstOrDefault(r => r.Id == id);
        }
    }
}
