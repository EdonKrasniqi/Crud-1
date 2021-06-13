using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Presistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) :base(options)
        {
        }
        public DbSet<Product> Products { get; set; }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Library> Library { get; set; }
        public DbSet<Clothing> Clothings { get; set; }
        public DbSet<Health> Healths { get; set; }
        public DbSet<Household> Households { get; set; }
        public DbSet<Sport> Sports { get; set; }
    }
}