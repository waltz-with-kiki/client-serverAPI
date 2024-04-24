using Microsoft.AspNetCore.Mvc;
using test.Server.Configuration.Classes;
using test.Server.Models;
using test.Server.Response;
using test.Server.Response.Intefaces;
using static test.Server.Controllers.MainController;

namespace test.Server.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IBaseResponse<Employee>> AddEmployeeToProjectAsync(int employeeId, int projectId);

        Task<IBaseResponse<Employee>> RemoveEmployeeInProject(ProjectEmployee projectemployee);


        Task<IBaseResponse<Project>> AddNewProject(NewProjectWithoutId newproject);

        Task<IBaseResponse<Project>> ChangeProject(ChangeProject changeproject);






    }
}
