using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test.Server.Configuration.Classes;
using test.Server.DAL.Interfaces;
using test.Server.Models;
using test.Server.Models.Base;
using test.Server.Services.Interfaces;

namespace test.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MainController: ControllerBase
    {

        private readonly IRepository<Project> _RepProjects;
        private readonly IRepository<Employee> _RepEmployees;
        private readonly IProjectService _ServiceProject;
        private readonly IEmployeeService _ServiceEmployee;

        public MainController(IRepository<Project> RepProjects, IRepository<Employee> RepEmployees, IProjectService projectService, IEmployeeService employeeService)
        {
            _RepProjects = RepProjects;
            _RepEmployees = RepEmployees;
            _ServiceProject = projectService;
            _ServiceEmployee = employeeService;
        }

        [HttpGet("projects")]
        public async Task<ICollection<Project>> GetProjects()
        {
            return await _RepProjects.Items.ToListAsync();
        }

        [HttpGet("employees")]
        public async Task<ICollection<Employee>> GetEmployees()
        {
            return await _RepEmployees.Items.ToListAsync();
        }

       

        [HttpPost("newproject")]
        public async Task<IActionResult> AddNewProject([FromBody] NewProjectWithoutId newproject)
        {
            var response = await _ServiceProject.AddNewProject(newproject);

            if(response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }
            return BadRequest(new {ErrorMessage = response.Description});
        }

        [HttpPost("changeproject")]
        public async Task<IActionResult> ChangeProject([FromBody] ChangeProject changeproject)
        {
            var response = await _ServiceProject.ChangeProject(changeproject);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }
            return BadRequest(new { ErrorMessage = response.Description });

        }

        [HttpPost("removeproject")]
        public async Task<IActionResult> RemoveProject([FromBody] Entity entity)
        {

            await _RepProjects.RemoveAsync(entity.Id);

            return Ok();
        }

        

        

        [HttpPost("newemployee")]
        public async Task<IActionResult> AddNewEmployee([FromBody] NewEmployeeWithoutId employee)
        {
            var response = await _ServiceEmployee.AddNewEmployee(employee);
            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description, data = response.Data });
            }

            return BadRequest(new { ErrorMessage = response.Description });
        }

        [HttpPost("changeemployee")]
        public async Task<IActionResult> ChangeEmployee([FromBody] NewEmployee employee)
        {
            var response = await _ServiceEmployee.ChangeEmployee(employee);
            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description, data = response.Data });
            }

            return BadRequest(new { ErrorMessage = response.Description });

        }

        [HttpPost("removeemployee")]
        public async Task<IActionResult> RemoveEmployee([FromBody] Entity entity)
        {
            await _RepEmployees.RemoveAsync(entity.Id);

            return Ok();
        }


        [HttpPost("addinproject")]
        public async Task<IActionResult> AddEmployeeInProject([FromBody] ProjectEmployee projectemployee)
        {

            var response = await _ServiceProject.AddEmployeeToProjectAsync(projectemployee.IdEmployee, projectemployee.IdProject);
            
            if(response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new {description = response.Description, data = response.Data});
            }

            return BadRequest(new {ErrorMessage = response.Description});
        }


        [HttpPost("removeinproject")]
        public async Task<IActionResult> RemoveEmployeeInProject([FromBody] ProjectEmployee projectemployee)
        {
            var response = await _ServiceProject.RemoveEmployeeInProject(projectemployee);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description});
            }

            return BadRequest(new { ErrorMessage = response.Description });
        }



    }
}
