using Microsoft.AspNetCore.Mvc;
using test.Server.Configuration.Classes;
using test.Server.Models;
using test.Server.Response.Intefaces;

namespace test.Server.Services.Interfaces
{
    public interface IEmployeeService
    {

        Task<IBaseResponse<Employee>> AddNewEmployee(NewEmployeeWithoutId employee);

        Task<IBaseResponse<Employee>> ChangeEmployee(NewEmployee employee);

    }
}
