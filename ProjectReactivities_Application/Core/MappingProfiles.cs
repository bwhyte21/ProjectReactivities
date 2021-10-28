using AutoMapper;
using ProjectReactivities_Domain;

namespace ProjectReactivities_Application.Core
{
  public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Mapping an Activity to an Activity (for the Edit functionality).
            CreateMap<Activity, Activity>();
        }
    }
}