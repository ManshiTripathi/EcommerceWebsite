using System.ComponentModel.DataAnnotations;

namespace FullProject.Models
{
    public class products
    {
        
            [Key]
            public int Id { get; set; }
            public string? title { get; set; }

            public int? price { get; set; }

            public string? description { get; set; }

            public string? category { get; set; }

            public string? image { get; set; }
        }
    }

