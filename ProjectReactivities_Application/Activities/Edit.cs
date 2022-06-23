using AutoMapper;
using FluentValidation;
using MediatR;
using ProjectReactivities_Application.Core;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectReactivities_Application.Activities;

/// <summary>
/// Update an Activity.
/// </summary>
public class Edit
{
    /// <summary>
    /// We're going to use Command to send the modified fields out.
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

    public class Handler : IRequestHandler<Command, ApiResult<Unit>>
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public Handler(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        /// <summary>
        /// Update the information in an existing Activity, then send it on its way.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<ApiResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // Retrieve the activity from the DB.
            var activity = await _db.Activities.FindAsync(request.Activity.Id);

            // Update the properties.

            // If null, return.
            if (activity == null) return null;

            // Map the properties using automapper; map each property from request into the object we wish to update.
            _mapper.Map(request.Activity, activity);

            // Save changes.
            var apiResult = await _db.SaveChangesAsync(cancellationToken) > 0;

            // Let the API controller know this task has completed.
            return !apiResult ? ApiResult<Unit>.Failure("Failed to edit activity.") : ApiResult<Unit>.Success(Unit.Value);
        }
    }
}