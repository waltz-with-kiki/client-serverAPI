using test.Server.Models.Base;

namespace test.Server.Models
{
    public class Employee : Entity
    {

        public string Name { get; set; }

        public string Surname { get; set; }

        public string? Patronymic { get; set; }

        public string? Email { get; set; }

        public virtual ICollection<Objective>? WorkObjectives { get; set; } = new List<Objective>();

        public virtual ICollection<Project>? EmployeeProjects { get; set; } = new List<Project>();
    }
}
