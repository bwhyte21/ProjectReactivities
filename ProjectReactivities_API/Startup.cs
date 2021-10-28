using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProjectReactivities_Application.Activities;
using ProjectReactivities_Application.Core;
using ProjectReactivities_DataAccess.Data;

namespace ProjectReactivities_API
{
    public class Startup
    {
        // Remodeling configuration member to a private one.
        private readonly IConfiguration _config;
        private readonly string _corsPolicy = "CorsPolicy";

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container. (Dependency Injection container)
        public void ConfigureServices(IServiceCollection services)
        {
            #region Controllers Service

            services.AddControllers();

            #endregion

            #region DbContext Service

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_config.GetConnectionString("DefaultConnection")));

            #endregion

            #region CORS Policy Service

            services.AddCors(options =>
            {
                options.AddPolicy(name: _corsPolicy, policy =>
                {
                    // Allow the client-app to access this API to send and receive requests/responses.
                    //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000/");
                    //policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                    policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                });
            });

            #endregion

            #region MediatR Service

            // Tell the MediatR where to find the handler(s).
            services.AddMediatR(typeof(List.Handler).Assembly);

            #endregion

            #region AutoMapper Service

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

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

            // CORS middleware (via CORS service) MUST be called AFTER UseRouting.
            app.UseCors(_corsPolicy);

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}