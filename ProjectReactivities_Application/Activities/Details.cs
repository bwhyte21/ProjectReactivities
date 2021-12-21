using MediatR;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System;
using System.Threading;
using System.Threading.Tasks;
using ProjectReactivities_Application.Core;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Activity Details
    /// </summary>
    public class Details
    {
        /// <summary>
        /// A nested class for fetching a single Activity Result using the MediatR interface and ApiResult.
        /// </summary>
        public class Query : IRequest<ApiResult<Activity>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<Activity>>
        {
            private readonly ApplicationDbContext _db;

            public Handler(ApplicationDbContext db)
            {
                _db = db;
            }

            /// <summary>
            /// Collect the Activity ApiResult in question.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<ApiResult<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _db.Activities.FindAsync(request.Id);
                return ApiResult<Activity>.Success(activity);
            }
        }
    }
}