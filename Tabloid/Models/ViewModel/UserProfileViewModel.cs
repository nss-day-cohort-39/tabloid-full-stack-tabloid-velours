using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models.ViewModel
{
    public class UserProfileViewModel
    {
        public UserProfile UserProfile { get; set; }
        public IEnumerable<Post> UserPosts { get; set; }

    }
}
