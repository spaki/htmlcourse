using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

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

            var type = typeof(T);
            var genericType = type.IsGenericType ? string.Join("_", type.GenericTypeArguments.Select(t => t.Name).ToArray()) : string.Empty;
            this.CacheKey = $"{type.Name}_{genericType}";
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
