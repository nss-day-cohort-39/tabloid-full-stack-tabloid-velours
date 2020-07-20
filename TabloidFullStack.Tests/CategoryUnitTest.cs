using System;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;
using Xunit;

namespace TabloidFullStack.Tests
{
    public class CategoryUnitTest
    {
    
        [Fact]
        public void Delete_Category_Unit_Test()
        {
            // Get all categories and count them
            var categoryRepo = new CategoryRepository(_context);
            var categoryCountBeforeDelete = categoryRepo.GetAll();
            var startingCount = categoryCountBeforeDelete.Count;

            // Add new categories-- THIS IS THE PART WE'RE TESTING
            var newCategory = new Category() { Name = "Test Name", IsDeleted = false };
            categoryRepo.Add(newCategory);

            // Get all categories again and count them
            var resultingCategories = categoryRepo.GetAll();
            var categoryCountAfterDelete = resultingCategories.Count;

            // Check that one has been added
            Assert.NotEqual(0, newCategory.Id);
            Assert.Equal(categoryCountBeforeDelete - 1, categoryCountAfterDelete);
        }
    }
}
