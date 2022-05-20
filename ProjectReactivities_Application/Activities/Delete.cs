using MediatR;
using ProjectReactivities_Application.Core;
using ProjectReactivities_DataAccess.Data;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectReactivities_Application.Activities;

/// <summary>
/// Delete an Activity.
/// </summary>
public class Delete
{
    /// <summary>
    /// We're going to Delete an Activity based on the Id.
    /// </summary>
    public class Command : IRequest<ApiResult<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, ApiResult<Unit>>
    {
        private readonly ApplicationDbContext _db;

        public Handler(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<ApiResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // Get the Activity.
            var activity = await _db.Activities.FindAsync(request.Id);

            // If null, return.
            //if (activity == null) { return null; }

            // Remove Activity from memory.
            _db.Remove(activity);

            // Save changes to remove activity from the db.
            var apiResult = await _db.SaveChangesAsync(cancellationToken) > 0;

            return !apiResult ? ApiResult<Unit>.Failure("Failed to delete activity.") : ApiResult<Unit>.Success(Unit.Value);
        }
    }
}