namespace test.Server.Configuration.Classes
{
    public record NewProjectWithoutId
    {
        public string? ProjectName { get; set; }

        public string? CustomerCompany { get; set; }

        public string? CompanyPerformer { get; set; }

        public int SupervisorId { get; set; }

        public string? Start { get; set; } 

        public string? End { get; set; }

        public int Priority { get; set; }
    }
}
