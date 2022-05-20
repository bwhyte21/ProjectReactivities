using System;

namespace ProjectReactivities_Domain;

/// <summary>
/// The Activity that is to be posted.
/// </summary>
public class Activity
{
    // EF will recognize that this is our primary key, be that it IS titled "Id".
    public Guid Id { get; set; } // Primary Key
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
}