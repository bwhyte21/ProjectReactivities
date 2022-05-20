using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ProjectReactivities_Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
}