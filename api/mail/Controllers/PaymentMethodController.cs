using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace mail.Controllers
{
    public class PaymentMethodController : CachedController<List<PaymentMethod>>
    {
        public PaymentMethodController(IConfiguration configuration, IMemoryCache cache) : base(configuration, cache)
        {
            var entities = this.GetCached();

            if (!entities.Any())
            {
                entities.Add(new PaymentMethod { Id = 1, Name = "Mastercard" });
                entities.Add(new PaymentMethod { Id = 2, Name = "Visa" });
                entities.Add(new PaymentMethod { Id = 3, Name = "Boleto" });

                this.SetChached(entities);
            }
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var entities = this.GetCached();
            return this.Ok(entities);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = this.GetCached().FirstOrDefault(e => e.Id == id); 

            if (result != null)
                return this.Ok(result);

            return this.BadRequest();
        }
    }
}