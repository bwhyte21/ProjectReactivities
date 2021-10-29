using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

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
        /// </summary>
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}