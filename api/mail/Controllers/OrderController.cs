using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace mail.Controllers
{
    public class OrderController : CachedController<List<Order>>
    {
        public OrderController(IConfiguration configuration, IMemoryCache cache) : base(configuration, cache)
        {
        }
        
        [HttpGet("{userMail}")]
        public IActionResult Get(string userMail)
        {
            var entities = this.GetCached();
            var result = entities.FirstOrDefault(e => e.UserMail == userMail);

            return this.Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Order entity)
        {
            var entities = this.GetCached();
            var original = entities.FirstOrDefault(e => e.BagId == entity.BagId);

            if (original == null)
            {
                entity.Date = DateTime.UtcNow;
                entities.Add(entity);
                this.SetChached(entities);
            }

            return this.Accepted();
        }
    }
}