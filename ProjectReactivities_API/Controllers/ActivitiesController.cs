using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectReactivities_Application.Activities;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;

namespace ProjectReactivities_API.Controllers
{
    public class ActivitiesController : BaseApiController // We have the base api derivation here so the route doesn't need to be set each time.
    {
        #region Old DI Code
        // DI with Data Context
        //private readonly ApplicationDbContext _db;
        #endregion

        // DI with Application Layer
        private readonly IMediator _mediator;

        /// <summary>
        /// CTOR
        /// </summary>
        /// <param name="mediator"></param>
        public ActivitiesController(IMediator mediator)
        {
            #region Old DI Code
            //_db = db;
            #endregion
            
            // Using newly added MediatR
            _mediator = mediator;
        }

        /// <summary>
        /// Endpoint to pull full list of activities.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            #region Old DI Code
            //return await _db.Activities.ToListAsync();
            #endregion

            // Using newly added MediatR from the App Layer to get list of all activities.
            return await _mediator.Send(new List.Query());
        }

        /// <summary>
        /// Allow user to select an individual activity.
        /// </summary>
        [HttpGet("{id:guid}")] // equivalence: activity/id except THIS particular endpoint has a route constraint ("id:guid") to decide if the value passed in is acceptable.
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            #region Old DI Code
            // Return activity based on id passed in (selected)
            //return await _db.Activities.FindAsync(id);
            #endregion

            // Return activity based on id passed in (selected)
            // Using newly added MediatR
            return Ok(); // this is temporary until a handler is made for this method.
        }
    }
}