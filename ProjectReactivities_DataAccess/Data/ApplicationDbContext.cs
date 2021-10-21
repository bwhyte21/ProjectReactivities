using ProjectReactivities_Domain;
using Microsoft.EntityFrameworkCore;

namespace ProjectReactivities_DataAccess.Data
{
    /// <summary>
    /// Abstraction of our Database. DI will be used to inject this across the project; setup in Startup.cs.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        /// <summary>
        /// Contain columns of activity properties via Activity.cs.
        /// </summary>
        public DbSet<Activity> Activities { get; set; }
    }
}