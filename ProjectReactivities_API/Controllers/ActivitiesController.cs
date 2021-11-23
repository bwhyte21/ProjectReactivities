using Microsoft.AspNetCore.Mvc;
using ProjectReactivities_Application.Activities;
using ProjectReactivities_Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectReactivities_API.Controllers
{
    public class ActivitiesController : BaseApiController // We have the base api derivation here so the route doesn't need to be set each time.
    {
        #region Old DI Code

        // DI with Data Context
        //private readonly ApplicationDbContext _db;

        #endregion

        #region Code Moved/Modified To BaseApiController

        // DI with Application Layer
        //private readonly IMediator _mediator;

        ///// <summary>
        ///// CTOR
        ///// </summary>
        ///// <param name="mediator"></param>
        //public ActivitiesController(IMediator mediator)
        //{
        //    #region Old DI Code

        //    //_db = db;

        //    #endregion

        //    // Using newly added MediatR
        //    _mediator = mediator;
        //}

        #endregion

        /// <summary>
        /// Endpoint to pull full list of activities.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            #region Old DI Code

            // The original code in this region has been moved to the Application Layer.
            //return await _db.Activities.ToListAsync();

            // Using MediatR from the App Layer to get list of all activities.
            //return await _mediator.Send(new List.Query());

            #endregion

            // Using MediatR from the App Layer to get list of all activities.
            // Using newly added property from BaseApi.
            return await Mediator.Send(new List.Query());
        }

        /// <summary>
        /// Allow user to select an individual activity.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:guid}")] // equivalence: activity/id except THIS particular endpoint has a route constraint ("id:guid") to decide if the value passed in is acceptable.
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            #region Old DI Code

            // The original code in this region has been moved to the Application Layer.

            // Return activity based on id passed in (selected)
            //return await _db.Activities.FindAsync(id);

            #endregion

            // Return activity based on id passed in (selected)
            // Using newly added MediatR
            return await Mediator.Send(new Details.Query { Id = id });
        }

        /// <summary>
        /// Allow user to create an activity.
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        /// <summary>
        /// Allow user to update an activity.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="activity"></param>
        /// <returns></returns>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            // Add the guid id to the activity object as it may not come with the body.
            activity.Id = id;

            // Pass it off to the handler
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        /// <summary>
        /// Allow user to delete an activity.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}