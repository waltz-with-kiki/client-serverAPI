using Microsoft.AspNetCore.Mvc;
using test.Server.Configuration.Classes;
using test.Server.DAL.Repositories;
using test.Server.DAL.Interfaces;
using test.Server.Models;
using test.Server.Response;
using test.Server.Response.Intefaces;
using test.Server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using test.Server.Models.Base;

namespace test.Server.Services
{
    public class ProjectService : IProjectService
    {

        private readonly IRepository<Project> _RepProjects;
        private readonly IRepository<Employee> _RepEmployees;

        public ProjectService(IRepository<Employee> employeeRepository, IRepository<Project> projectRepository)
        {
            _RepEmployees = employeeRepository;
            _RepProjects = projectRepository;
        }


        public async Task<ICollection<Project>> GetProjects()
        {
            return await _RepProjects.Items.ToListAsync();
        }

        public async Task<IBaseResponse<Project>> RemoveProject(Entity entity)
        {
            await _RepProjects.RemoveAsync(entity.Id);

            return new BaseResponse<Project>()
            {
                Description = "Проект успешно удалён",
                StatusCode = StatusCode.OK
            };

        }

        public async Task<IBaseResponse<Employee>> AddEmployeeToProjectAsync(int employeeId, int projectId)
        {
            var employee = await _RepEmployees.GetAsync(employeeId);
            if (employee == null)
                return new BaseResponse<Employee>()
                {
                    Description = "Сотрудник не найден",
                    StatusCode = StatusCode.NotFound,
                };

            var project = await _RepProjects.GetAsync(projectId);
            if (project == null)
                return new BaseResponse<Employee>()
                {
                    Description = "Проект не найден",
                    StatusCode = StatusCode.NotFound,
                };

            var checkemployee = project.Employees.FirstOrDefault(x => x.Id == employeeId);
            if (checkemployee != null)
                return new BaseResponse<Employee>()
                {
                    Description = "Сотрудник уже находится в проекте",
                    StatusCode = StatusCode.BaseError,
                };

            project.Employees.Add(employee);
            await _RepProjects.UpdateAsync(project);

            return new BaseResponse<Employee>()
            {
                Description = "Сотрудник добавлен в проект",
                StatusCode = StatusCode.OK,
                Data = employee,
            };
        }

        public async Task<IBaseResponse<Project>> AddNewProject(NewProjectWithoutId newproject)
        {
            var supervisor = await _RepEmployees.GetAsync(newproject.SupervisorId);
            if(supervisor == null)
            {
                return new BaseResponse<Project>()
                {
                    Description = "Сотрудник не найден",
                    StatusCode = StatusCode.NotFound
                };
            }

            Project NewProject = new Project
            {
                ProjectName = newproject.ProjectName,
                CustomerCompany = newproject.CustomerCompany,
                CompanyPerformer = newproject.CompanyPerformer,
                SupervisorId = newproject.SupervisorId,
                Start = newproject.Start,
                End = newproject.End,
                Priority = newproject.Priority
            };

            _RepProjects.Add(NewProject);

            return new BaseResponse<Project>()
            {
                Description = "Новый проект создан",
                StatusCode = StatusCode.OK
            };
        }

        public async Task<IBaseResponse<Project>> ChangeProject(ChangeProject changeproject)
        {
            var project = await _RepProjects.GetAsync(changeproject.Id);

            if (project == null)
            {
                return new BaseResponse<Project>()
                {
                    Description = "Проект не найден",
                    StatusCode = StatusCode.NotFound
                };
            }

            var supervisor = await _RepEmployees.GetAsync(changeproject.SupervisorId);
            if (supervisor == null)
            {
                return new BaseResponse<Project>()
                {
                    Description = "Сотрудник не найден",
                    StatusCode = StatusCode.NotFound
                };
            }


            project.ProjectName = changeproject.ProjectName;
            project.CustomerCompany = changeproject.CustomerCompany;
            project.CompanyPerformer = changeproject.CompanyPerformer;
            project.SupervisorId = changeproject.SupervisorId;
            project.Start = changeproject.Start;
            project.End = changeproject.End;
            project.Priority = changeproject.Priority;

            await _RepProjects.UpdateAsync(project);

            return new BaseResponse<Project>()
            {
                Description = "Проект успешно изменён",
                StatusCode = StatusCode.OK
            };

        }

        public async Task<IBaseResponse<Employee>> RemoveEmployeeInProject(ProjectEmployee projectemployee)
        {


            var employee = await _RepEmployees.GetAsync(projectemployee.IdEmployee);

            if (employee == null)
                return new BaseResponse<Employee>()
                {
                    Description = "Сотрудник не найден",
                    StatusCode = StatusCode.NotFound,
                };

            var project = await _RepProjects.GetAsync(projectemployee.IdProject);

            if (project == null)
                return new BaseResponse<Employee>()
                {
                    Description = "Проект не найден",
                    StatusCode = StatusCode.NotFound,
                };


            project.Employees.Remove(employee);

            _RepProjects.Update(project);

            return new BaseResponse<Employee>()
            {
                Description = "Сотрудник успешно удалён",
                StatusCode = StatusCode.OK
            };

        }



    }
}
