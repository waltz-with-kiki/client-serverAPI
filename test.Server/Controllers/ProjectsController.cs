using Microsoft.AspNetCore.Mvc;
using test.Server.Configuration.Classes;
using test.Server.Models;
using test.Server.Models.Base;
using test.Server.Services.Interfaces;

namespace test.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController :ControllerBase
    {
        private readonly IProjectService _ServiceProject;

        public ProjectsController(IProjectService projectService)
        {
            _ServiceProject = projectService;
        }


        [HttpGet("projects")]
        public async Task<ICollection<Project>> GetProjects()
        {
            return await _ServiceProject.GetProjects();
        }


        [HttpPost("newproject")]
        public async Task<IActionResult> AddNewProject([FromBody] NewProjectWithoutId newproject)
        {
            var response = await _ServiceProject.AddNewProject(newproject);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }
            return BadRequest(new { ErrorMessage = response.Description });
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
            var response = await _ServiceProject.RemoveProject(entity);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }
            return BadRequest(new { ErrorMessage = response.Description });

        }



        [HttpPost("addinproject")]
        public async Task<IActionResult> AddEmployeeInProject([FromBody] ProjectEmployee projectemployee)
        {
            var response = await _ServiceProject.AddEmployeeToProjectAsync(projectemployee.IdEmployee, projectemployee.IdProject);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description, data = response.Data });
            }

            return BadRequest(new { ErrorMessage = response.Description });
        }


        [HttpPost("removeinproject")]
        public async Task<IActionResult> RemoveEmployeeInProject([FromBody] ProjectEmployee projectemployee)
        {
            var response = await _ServiceProject.RemoveEmployeeInProject(projectemployee);

            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }

            return BadRequest(new { ErrorMessage = response.Description });
        }

    }
}
