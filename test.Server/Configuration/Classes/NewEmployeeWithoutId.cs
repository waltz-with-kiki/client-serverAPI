﻿namespace test.Server.Configuration.Classes
{
    public record NewEmployeeWithoutId
    {

        public string Name { get; set; }

        public string Surname { get; set; }

        public string? Patronymic { get; set; }

        public string? Email { get; set; }
    }
}
