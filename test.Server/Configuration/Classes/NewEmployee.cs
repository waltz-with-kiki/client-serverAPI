namespace test.Server.Configuration.Classes
{
    public record NewEmployee :NewEmployeeWithoutId
    {
        public int Id { get; set; }

    }
}
