using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using ProjectReactivities_Application.Activities;
using ProjectReactivities_Application.Core;
using ProjectReactivities_DataAccess.Data;

namespace ProjectReactivities_API.Extensions
{
    /// <summary>
    /// Just a static class to keep the Startup services elsewhere. Makes Startup.cs look cleaner.
    /// </summary>
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config, string corsPolicy)
        {
            #region Swagger

            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "Reactivities", Version = "v1" }); });

            #endregion

            #region Fluent Validation

            services.AddControllers().AddFluentValidation(fluentConfig => { fluentConfig.RegisterValidatorsFromAssemblyContaining<Create>(); });

            #endregion

            #region DbContext Service

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            #endregion

            #region CORS Policy Service

            services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicy, policy =>
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

            return services;
        }
    }
}