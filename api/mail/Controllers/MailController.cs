using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace mail.Controllers
{
    public class MailController : CachedController<List<Message>>
    {
        public MailController(IConfiguration configuration, IMemoryCache cache) : base (configuration, cache)
        {
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var result = this.GetCached();
            return this.Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Message entity)
        {
            var messages = this.GetCached();
            messages.Add(entity);
            this.SetChached(messages);

            var fromMail = "cursodehtmlinicial@mail.com";

            new SmtpClient("smtp.mail.com", 587)
            {
                Credentials = new NetworkCredential(fromMail, ""),
                EnableSsl = true
            }.Send(fromMail, entity.Email, entity.Title, entity.Body);

            return this.Accepted();
        }
    }
}
