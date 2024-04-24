namespace test.Server.Configuration.Classes
{
    public record ChangeProject : NewProjectWithoutId
    {
        public int Id { get; set; }

    }
}
