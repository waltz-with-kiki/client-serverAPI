using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using test.Server.Models.Base;

namespace test.Server.Models
{
    public class Project : Entity
    {

        public string ProjectName { get; set; }

        public string? CustomerCompany { get; set; }

        public string? CompanyPerformer { get; set; }

        public int SupervisorId { get; set; }

        public virtual Employee? Supervisor { get; set; }

        public virtual ICollection<Employee>? Employees { get; set; } = new List<Employee>();

        public string Start { get; set; } = DateTime.Today.ToShortDateString();

        public string? End { get; set; }

        public int Priority { get; set; }

    }
}
