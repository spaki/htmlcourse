using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
        public IActionResult Get()
        {
            var result = this.cache.Get<List<Message>>(CacheMessagesKey);
            return this.Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Message entity)
        {
            var messages = this.cache.GetOrCreate<List<Message>>(CacheMessagesKey, cacheEntry => { return new List<Message>(); });
            messages.Add(entity);
            this.cache.Set(CacheMessagesKey, messages, DateTime.Now.AddHours(CacheTimeInHours));

            var fromMail = "cursodehtmlinicial@mail.com";

            new SmtpClient("smtp.mail.com", 587)
            {
                Credentials = new NetworkCredential(fromMail, ""),
                EnableSsl = true
            }.Send(fromMail, entity.Email, entity.Title, entity.Body);

            return this.Accepted();
        }

        [HttpGet("sum")]
        public IActionResult Sum(int a, int b)
        {
            return this.Ok(new { result = a + b });
        }
    }
}
