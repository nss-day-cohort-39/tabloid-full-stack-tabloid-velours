using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Subscription> GetAll()
        {
            return _context.Subscription.ToList();
        }
        public Subscription GetSubscription(int id)
        {
            return _context.Subscription
               .FirstOrDefault(s => s.Id == id);
        }

        public Subscription GetBySubscriberProfileId(int id)
        {
            return _context.Subscription
               .FirstOrDefault(s => s.SubscriberUserProfileId == id);
        }
        public Subscription GetByProviderProfileId(int id)
        {
            return _context.Subscription
               .FirstOrDefault(s => s.ProviderUserProfileId == id);
        }

        public void Add(Subscription subscription)
        {
            _context.Add(subscription);
            _context.SaveChanges();
        }
        public void Update(Subscription subscription)
        {
            
            _context.Entry(subscription).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var subscription = GetSubscription(id);
            _context.Subscription.Remove(subscription);
            _context.SaveChanges();
        }
    }
}
