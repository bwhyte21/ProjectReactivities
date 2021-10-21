using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectReactivities_DataAccess.Data;

namespace ProjectReactivities_API
{
    public class Startup
    {
        // Remodeling configuration member to a private one.
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container. (Dependency Injection container)
        public void ConfigureServices(IServiceCollection services)
        {
            #region DbContext Service

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_config.GetConnectionString("DefaultConnection")));

            #endregion

            #region Controllers Service

            services.AddControllers();

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Middleware goes in here.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // All ()'s here are middlewares.
            if (env.IsDevelopment()) { app.UseDeveloperExceptionPage(); }

            app.UseHttpsRedirection();

            // Routing Middleware responsible for routing to the endpoints (below)
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}