using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;

namespace ProjectReactivities_API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = true;
            opt.Password.RequireDigit = true;
            opt.Password.RequiredUniqueChars = 2;
        }).AddEntityFrameworkStores<ApplicationDbContext>().AddSignInManager<SignInManager<AppUser>>();

        services.AddAuthentication();

        return services;
    }
}