using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace mail.Controllers
{
    public class BagController : CachedController<List<Bag>>
    {
        public BagController(IConfiguration configuration, IMemoryCache cache) : base(configuration, cache)
        {
        }
        
        [HttpGet("{userMail}/history")]
        public IActionResult GetHistory(string userMail)
        {
            var entities = this.GetCached();
            var result = entities.Where(e => e.UserMail == userMail).ToList();

            return this.Ok(result);
        }

        [HttpGet("{userMail}/id/{id}")]
        public IActionResult GetById(string userMail, Guid id)
        {
            var entities = this.GetCached();
            var result = entities.FirstOrDefault(e => e.UserMail == userMail && e.Id == id);

            return this.Ok(result);
        }

        [HttpGet("{userMail}")]
        public IActionResult Get(string userMail)
        {
            var entities = this.GetCached();
            var result = entities.FirstOrDefault(e => e.UserMail == userMail && e.IsActive);

            return this.Ok(result);
        }

        [HttpPatch("{userMail}")]
        public IActionResult Patch(string userMail, [FromBody]BagItem item)
        {
            var entities = this.GetCached();
            var bag = entities.FirstOrDefault(e => e.UserMail == userMail && e.IsActive);

            if (bag == null)
                bag = new Bag { Id = Guid.NewGuid(), Items = new List<BagItem>(), UserMail = userMail, IsActive = true };
            else
                entities.Remove(bag);

            var bagItem = bag.Items.FirstOrDefault(e => e.ProductId == item.ProductId);

            if (bagItem == null)
                bag.Items.Add(item);
            else
                bagItem.Quantity = item.Quantity;

            entities.Add(bag);
            this.SetChached(entities);

            return this.Accepted();
        }

        [HttpPatch("{userMail}/removeItem/{productId}")]
        public IActionResult PatchRemoveItem(string userMail, int productId)
        {
            var entities = this.GetCached();
            var bag = entities.FirstOrDefault(e => e.UserMail == userMail && e.IsActive);

            if (bag != null)
            {
                entities.Remove(bag);
                var bagItem = bag.Items.FirstOrDefault(e => e.ProductId == productId);

                if (bagItem != null)
                    bag.Items.Remove(bagItem);

                entities.Add(bag);
                this.SetChached(entities);

                return this.Accepted();
            }

            return this.Accepted();
        }

        [HttpPatch("disable/{userMail}")]
        public IActionResult Disable(string userMail)
        {
            var entities = this.GetCached();
            var bag = entities.FirstOrDefault(e => e.UserMail == userMail && e.IsActive);
            entities.Remove(bag);
            bag.IsActive = false;
            entities.Add(bag);
            this.SetChached(entities);

            return this.Accepted();
        }
    }
}