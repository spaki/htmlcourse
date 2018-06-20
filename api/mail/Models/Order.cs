using System;

namespace mail.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string UserMail { get; set; }
        public Guid BagId { get; set; }
        public int PaymentMethodId { get; set; }
    }
}
