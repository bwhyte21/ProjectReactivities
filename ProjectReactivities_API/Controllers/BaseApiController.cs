using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectReactivities_Application.Core;

namespace ProjectReactivities_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // DI with Application Layer.
        private IMediator _mediator;

        /// <summary>
        /// Make Mediator available to any derived classes from BaseApi.
        /// This property is set to protected to make available to any derived classes and BaseApi itself whilst using Null Coalescing.
        /// Purpose: So we do not need to setup DI in each CTOR of every controller.
        /// Extra: It is of type "protected" because we are only using it in THIS class and any DERIVED classes.
        /// </summary>
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        /// <summary>
        /// Return success if call to API is good.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="result"></param>
        /// <returns></returns>
        protected ActionResult HandleApiResult<T>(ApiResult<T> result)
        {
            if (result == null) { return NotFound(); }

            return result.IsSuccess switch
            {
                true when result.Value != null => Ok(result.Value),
                true when result.Value == null => NotFound(),
                // If all has failed.
                _ => BadRequest(result.Error)
            };
        }
    }
}