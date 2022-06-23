using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ProjectReactivities_API.Extensions
{
    public static class ApplicationMiddlewareExtensions
    {
        public static IApplicationBuilder AddApplicationMiddleware(this IApplicationBuilder app, IWebHostEnvironment env, string corsPolicy)
        {
            // Custom exception handling middleware.
            app.UseMiddleware<ExceptionMiddlewareExtension>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            // Routing Middleware responsible for routing to the endpoints (below)
            app.UseRouting();

            // CORS middleware (via CORS service) MUST be called AFTER UseRouting.
            app.UseCors(corsPolicy);

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            return app;
        }
    }
}