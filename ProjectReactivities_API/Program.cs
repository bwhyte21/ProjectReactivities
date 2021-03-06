using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_DataAccess.Initializer;
using System;
using System.Threading.Tasks;

namespace ProjectReactivities_API;

public class Program
{
    public static async Task Main(string[] args)
    {
        /*
         -Another way to create a DB if none exist, is to do it programatically on start, and apply any migrations available.
         -Main is now async due to the async task of SeedData to seed the db on start if DB is empty.
        */

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
            await dataContext.Database.MigrateAsync();

            // Seed database after the migration.
            await Seed.SeedData(dataContext);
        }
        catch (Exception ex)
        {
            // Log any exceptions we come across.
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error has occurred during migration.");
        }

        // Don't forget to start the application!
        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}