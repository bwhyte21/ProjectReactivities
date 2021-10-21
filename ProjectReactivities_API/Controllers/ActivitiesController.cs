using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectReactivities_DataAccess.Data;
using ProjectReactivities_Domain;

namespace ProjectReactivities_API.Controllers
{
  public class ActivitiesController : BaseApiController // We have the baseapi derivation here so the route doesn't need to be set each time.
  {
      // DI with Data Context
      private readonly ApplicationDbContext _db;

      /// <summary>
      /// CTOR
      /// </summary>
      /// <param name="db"></param>
      public ActivitiesController(ApplicationDbContext db)
      {
          _db = db;
      }

      /// <summary>
      /// Endpoint to pull full list of activities.
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      public async Task<ActionResult<List<Activity>>> GetActivities()
      {
          return await _db.Activities.ToListAsync();
      }

      /// <summary>
      /// Allow user to select an individual activity.
      /// </summary>
      [HttpGet("{id:guid}")] // equivalence: activity/id except THIS particular endpoint has a route constraint ("id:guid") to decide if the value passed in is acceptable.
      public async Task<ActionResult<Activity>> GetActivity(Guid id)
      {
          // Return activity based on id passed in (selected)
          return await _db.Activities.FindAsync(id);
      }
  }
}
