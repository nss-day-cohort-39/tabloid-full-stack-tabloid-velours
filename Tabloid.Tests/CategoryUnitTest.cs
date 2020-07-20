using System;
using System.Collections.Generic;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;
using Xunit;
using System.Linq;

namespace Tabloid.Tests
{
    public class CategoryUnitTest : EFTestFixture
    {
        [Fact]
        public void Soft_Delete_Category_Unit_Test()
        {
            // Get all categories and count them
            var categoryRepo = new CategoryRepository(_context);
            var nonDeletedCategories = categoryRepo.GetAll();
            var numberCategoriesBeforeDelete = nonDeletedCategories.Count;

            // Update a category to IsDeleted == true
            var category1 = new Category()
            {
                Name = "Bananas",
                IsDeleted = true
            };
            categoryRepo.Update(category1);

            // Get all categories again and count them
            var resultingCategories = categoryRepo.GetAll();
            var categoryCountAfterDelete = resultingCategories.Count;

            // Check that one has been added
            Assert.NotEqual(0, category1.Id);
            Assert.Equal(numberCategoriesBeforeDelete - 1, categoryCountAfterDelete);
        }
    }
}
