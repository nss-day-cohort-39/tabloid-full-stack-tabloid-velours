using Tabloid.Models;
using Tabloid.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Tabloid.Models;
using Xunit;

namespace Tabloid.Tests
    {
        public class CategoryRepositoryTests : EFTestFixture
        {
            public CategoryRepositoryTests()
            {
                AddSampleData();
            }

            // Add sample data
            private void AddSampleData()
            {
                var category1 = new Category()
                {
                    Name = "Bananas",
                    IsDeleted = false
                };

                _context.Add(category1);
               
        }
    }
}
