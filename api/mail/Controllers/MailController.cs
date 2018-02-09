using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace mail.Controllers
{
    [Route("api/[controller]")]
    public class MailController : Controller
    {
        private const string CacheMessagesKey = "CacheMessages";
        private const int CacheTimeInHours = 1;
        private IMemoryCache cache;

        public MailController(IMemoryCache cache)
        {
            this.cache = cache;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = this.cache.Get<List<Message>>(CacheMessagesKey);
            return this.Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Message entity)
        {
            var messages = this.cache.GetOrCreate<List<Message>>(CacheMessagesKey, cacheEntry => { return new List<Message>(); });
            messages.Add(entity);
            this.cache.Set(CacheMessagesKey, messages, DateTime.Now.AddHours(CacheTimeInHours));

            return this.Accepted();
        }
    }
}
