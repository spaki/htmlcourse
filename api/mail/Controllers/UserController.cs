using mail.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace mail.Controllers
{
    public class UserController : CachedController<List<User>>
    {
        public UserController(IConfiguration configuration, IMemoryCache cache) : base(configuration, cache)
        {
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]User entity)
        {
            if (string.IsNullOrWhiteSpace(entity.Email) || string.IsNullOrWhiteSpace(entity.Password))
                return this.BadRequest(new { Message = "Invalid user info." });

            var entities = this.GetCached();

            if (entities.Any(e => e.Email == entity.Email))
                return this.BadRequest(new { Message = "Invalid e-mail." });

            entities.Add(entity);
            this.SetChached(entities);

            return this.Ok(entity);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]User entity)
        {
            var result = this.GetCached().FirstOrDefault(e => e.Email == entity.Email && e.Password == entity.Password); 

            if (result != null)
                return this.Ok(result);

            return this.BadRequest();
        }
    }
}