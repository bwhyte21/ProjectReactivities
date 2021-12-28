using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using ProjectReactivities_Application.Core;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Create an Activity
    /// </summary>
    public class Create
    {
        /// <summary>
        /// Remember CQRS, this is the C-part. Command, there will be no return of data, but a command to create.
        /// This will pass an object of Activity from the API to the Handler to create an Activity.
        /// Note: Adding "UNIT" to Result type to specify that nothing is being returned.
        /// </summary>
        public class Command : IRequest<ApiResult<Unit>>
        {
            public Activity Activity { get; set; }
        }

        /// <summary>
        /// A sort of "middleware" to add validation rules to activity Create/Edit operations server-side. Validate with "Command" because it contains "Activity".
        /// </summary>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        /// <summary>
        /// IRequest Handler, duh.
        /// </summary>
        public class Handler : IRequestHandler<Command, ApiResult<Unit>>
        {
            private readonly ApplicationDbContext _db;

            public Handler(ApplicationDbContext db)
            {
                _db = db;
            }

            /// <summary>
            /// Gather the Activity information to be sent off for creation.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<ApiResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Add created Activity to Activities context.
                _db.Activities.Add(request.Activity);

                // Save addition.
                // SaveChangesAsync returns an INT:
                // If changes found are greater than 0, result = true, else false.
                var apiResult = await _db.SaveChangesAsync(cancellationToken) > 0;

                // Let the API controller know that this task is finished or if it failed.
                return !apiResult ? ApiResult<Unit>.Failure("Failed to create activity.") : ApiResult<Unit>.Success(Unit.Value);
            }
        }
    }
}