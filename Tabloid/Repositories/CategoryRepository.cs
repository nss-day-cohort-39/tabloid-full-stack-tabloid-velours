using System.Collections.Generic;
using System.Linq;
using Tabloid.Data;
using Tabloid.Models;
using Microsoft.EntityFrameworkCore;


namespace Tabloid.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Category> GetAll()
        {
            return _context.Category
                .OrderBy(c => c.Name)
                .ToList();
        }
    }
}
