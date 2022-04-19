namespace FullProject.Models
{
    public class Order
    {

        public int OrderId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }
        public string? UserAddress { get; set; }
        public string? ProductName { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }

    }
}
