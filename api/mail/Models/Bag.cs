using System;
using System.Collections.Generic;

namespace mail.Models
{
    public class Bag
    {
        public Guid Id { get; set; }
        public string UserMail { get; set; }
        public List<BagItem> Items { get; set; }
        public bool IsActive { get; set; }
    }
}
