using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjectReactivities_API.Extensions;

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

            #region Other Services

            services.AddApplicationServices(_config, _corsPolicy);

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Middleware goes in here.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // All ()'s here are middlewares.
            app.AddApplicationMiddleware(env, _corsPolicy);
        }
    }
}