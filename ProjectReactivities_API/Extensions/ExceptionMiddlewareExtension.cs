using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ProjectReactivities_Application.Core;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProjectReactivities_API.Extensions
{
    public class ExceptionMiddlewareExtension
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddlewareExtension> _logger;
        private readonly IHostEnvironment _env;

        /// <summary>
        /// Each middleware is a request delegate with a 'next' method.
        /// </summary>
        /// <param name="next"></param>
        /// <param name="logger"></param>
        /// <param name="env"></param>
        public ExceptionMiddlewareExtension(RequestDelegate next, ILogger<ExceptionMiddlewareExtension> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        /// <summary>
        /// When a request comes in, it will pass through to the next middleware, unless we get an exception.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            try { await _next(context); }
            catch (Exception ex)
            {
                // Will be visible in terminal window.
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                // If in Dev mode, show exception, otherwise display message. Only Devs should see exceptions.
                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new ApiException(context.Response.StatusCode, "Server Error");

                // Serialize the json.
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);

                // Show the response.
                await context.Response.WriteAsync(json);
            }
        }
    }
}