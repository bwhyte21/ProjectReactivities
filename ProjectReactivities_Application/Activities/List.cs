using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;

namespace ProjectReactivities_Application.Activities
{
    /// <summary>
    /// Activity List.
    /// </summary>
    public class List
    {
        /// <summary>
        /// A nested class for fetching data (list of activities) using the MediatR interface.
        /// </summary>
        public class Query : IRequest<List<Activity>> { }

        /// <summary>
        /// A Handler class for the Query class
        /// </summary>
        public class Handler : IRequestHandler<Query, List<Activity>>
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
            /// Return list of activities from mediated handler.
            /// </summary>
            /// <param name="request"></param>
            /// <param name="cancellationToken"></param>
            /// <returns></returns>
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _db.Activities.ToListAsync(cancellationToken: cancellationToken);
            }
        }
    }
}