using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Update an Activity.
    /// </summary>
    public class Edit
    {
        /// <summary>
        /// We're going to use Command to send the modified fields out.
        /// </summary>
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
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
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Retrieve the activity from the DB.
                var activity = await _db.Activities.FindAsync(request.Activity.Id);

                // Update the properties. 
                //activity.Title = request.Activity.Title ?? activity.Title; // Setting properties manually.

                // Map the properties using automapper; map each property from request into the object we wish to update.
                _mapper.Map(request.Activity, activity);

                // Save changes.
                await _db.SaveChangesAsync(cancellationToken);

                // Let the API controller know this task has completed.
                return Unit.Value;
            }
        }
    }
}