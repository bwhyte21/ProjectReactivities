using FluentValidation;
using ProjectReactivities_Domain;

namespace ProjectReactivities_Application.Activities;

/// <summary>
/// Central validator for Activity CRUD actions.
/// </summary>
public class ActivityValidator : AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
    }
}