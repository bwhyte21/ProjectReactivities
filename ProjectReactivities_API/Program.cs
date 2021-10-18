using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProjectReactivities_DataAccess.Data;

namespace ProjectReactivities_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /* Another way to create a DB if none exist, is to do it programatically on start, and apply any migrations available. */

            // Store host into a variable.
            var host = CreateHostBuilder(args).Build();

            // Once this method is complete, scope will be disposed of due to the "using" method.
            using var scope = host.Services.CreateScope();

            // Capture scope as service provider.
            var services = scope.ServiceProvider;

            try
            {
                // Acquire data context as a service.
                var dataContext = services.GetRequiredService<ApplicationDbContext>();
                // Apply any pending migrations.
                dataContext.Database.Migrate();
            }
            catch (Exception ex)
            {
                // Log any exceptions we come across.
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error has occurred during migration.");
            }

            // Don't forget to start the application!
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}