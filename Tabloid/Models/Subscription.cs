using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Subscription
    {
        public int id { get; set; }
        public int SubscriberUserProfileId { get; set; }
        public int AuthorUserProfileId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

    }
}
