using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System.Threading;
using System.Threading.Tasks;

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
        /// </summary>
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
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
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Add created Activity to Activities context.
                _db.Activities.Add(request.Activity);

                // Save addition.
                await _db.SaveChangesAsync(cancellationToken);

                // Let the API controller know that this task is finished.
                return Unit.Value;
            }
        }
    }
}