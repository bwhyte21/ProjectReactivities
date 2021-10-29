using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Activity Details
    /// </summary>
    public class Details
    {
        /// <summary>
        /// A nested class for fetching a single Activity using the MediatR interface.
        /// </summary>
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly ApplicationDbContext _db;

            public Handler(ApplicationDbContext db)
            {
                _db = db;
            }

            /// <summary>
            /// Collect the details for the Activity in question.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _db.Activities.FindAsync(request.Id);
            }
        }
    }
}