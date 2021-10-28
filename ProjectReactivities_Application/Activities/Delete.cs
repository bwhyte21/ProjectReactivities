using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Delete an Activity.
    /// </summary>
  public class Delete
  {
      /// <summary>
      /// We're going to Delete an Activity based on the Id.
      /// </summary>
      public class Command : IRequest
      {
          public Guid Id { get; set; }
      }

      public class Handler : IRequestHandler<Command>
      {
          private readonly ApplicationDbContext _db;

          public Handler(ApplicationDbContext db)
          {
              _db = db;
          }

          public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
          {
              // Get the Activity.
              var activity = await _db.Activities.FindAsync(request.Id);
              
              // Remove Activity from memory.
              _db.Activities.Remove(activity);

              // Save changes to remove activity from the db.
              await _db.SaveChangesAsync(cancellationToken);

              return Unit.Value;
          }
      }
  }
}
