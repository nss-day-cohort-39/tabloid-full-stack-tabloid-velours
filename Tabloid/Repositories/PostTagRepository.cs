using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostTagRepository
    {

        private readonly ApplicationDbContext _context;

        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetAll()
        {
            return _context.PostTag
                .ToList();
        }
        public PostTag GetByTagId(int id)
        {
            return _context.PostTag
               .FirstOrDefault(t => t.Id == id);
        }

        //public void Add(Tag tag)
        //{
        //    _context.Add(tag);
        //    _context.SaveChanges();
        //}

        //public void Delete(int id)
        //{
        //    var tag = GetById(id);
        //    _context.Tag.Remove(tag);
        //    _context.SaveChanges();
        //}
        //public void Update(Tag tag)
        //{
        //    _context.Entry(tag).State = EntityState.Modified;
        //    _context.SaveChanges();
        //}
    }
}
