using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ProjectReactivities_Application.Core;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Activity List.
    /// </summary>
    public class List
    {
        /// <summary>
        /// A nested class for fetching data (list of activities) using the MediatR interface and ApiResult.
        /// </summary>
        public class Query : IRequest<ApiResult<List<Activity>>> { }

        /// <summary>
        /// A Handler class for the Query class
        /// </summary>
        public class Handler : IRequestHandler<Query, ApiResult<List<Activity>>>
        {
            private readonly ApplicationDbContext _db;

            /// <summary>
            /// Bring in the Data Context to get a hold of the data.
            /// </summary>
            /// <param name="db"></param>
            public Handler(ApplicationDbContext db)
            {
                _db = db;
            }

            /// <summary>
            /// Return list of activities within a result object from mediated handler.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<ApiResult<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _db.Activities.ToListAsync(cancellationToken);
                return ApiResult<List<Activity>>.Success(result);
            }
        }
    }
}