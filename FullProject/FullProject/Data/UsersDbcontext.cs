using Microsoft.EntityFrameworkCore;
using FullProject.Models;

namespace FullProject.Data
{
    public class UsersDbcontext : DbContext
    {
    
        public DbSet<User> User { get; set; }
        public DbSet<products> products { get; set; }
        public DbSet<Order> Order { get; set; }
 


        public UsersDbcontext(DbContextOptions<UsersDbcontext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder model)
        {
            model.Entity<User>().ToTable("user_entry");
            model.Entity<products>().ToTable("products");
            model.Entity<Order>().ToTable("Orders");
        


        }
       

    }
   
}
