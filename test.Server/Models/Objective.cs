using test.Server.Models.Base;

namespace test.Server.Models
{
    public class Objective : Entity
    {
        public string Name { get; set; }

        public int AuthorId { get; set; }

        public int ExecutorId { get; set; }

        public virtual Employee? Author { get; set; }

        public virtual Employee? Executor { get; set; }

        public ObjectiveStatus Status { get; set; } = ObjectiveStatus.ToDo;
        
        public string? Commnet { get; set; }

        public int Priority { get; set; }
    }
}
