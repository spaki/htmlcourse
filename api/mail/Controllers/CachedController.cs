using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;

namespace mail.Controllers
{
    public abstract class CachedController<T> : BaseController
    {
        public int CacheTimeInHours { get; private set; }
        public string CacheKey { get; private set; }
        public IMemoryCache Cache { get; private set; }

        public CachedController(IConfiguration configuration, IMemoryCache cache)
        {
            this.CacheTimeInHours = configuration.GetValue<int>("CacheTimeInHours");
            this.Cache = cache;
            this.CacheKey = typeof(T).Name;
        }

        protected T GetCached()
        {
            return this.Cache.GetOrCreate(this.CacheKey, cacheEntry => { return Activator.CreateInstance<T>(); });
        }

        protected void SetChached(T value)
        {
            this.Cache.Set(this.CacheKey, value, DateTime.Now.AddHours(this.CacheTimeInHours));
        }
    }
}
