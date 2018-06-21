﻿using System;
using System.Collections.Generic;

namespace mail.Models
{
    public class PagedResult<T>
    {
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public List<T> Items { get; set; }
    }
}
