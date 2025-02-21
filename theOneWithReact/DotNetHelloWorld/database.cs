using Microsoft.EntityFrameworkCore;

namespace MyApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } // This line includes Product.cs

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ... (optional model configuration) ...
        }
    }
}
