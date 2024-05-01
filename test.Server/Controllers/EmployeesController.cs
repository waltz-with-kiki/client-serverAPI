using Microsoft.AspNetCore.Mvc;
using test.Server.Configuration.Classes;
using test.Server.Models;
using test.Server.Models.Base;
using test.Server.Services.Interfaces;

namespace test.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController :ControllerBase
    {
        private readonly IEmployeeService _ServiceEmployee;

        public EmployeesController(IEmployeeService serviceEmployee)
        {
            _ServiceEmployee = serviceEmployee;
        }


        [HttpGet("employees")]
        public async Task<ICollection<Employee>> GetEmployees()
        {
            return await _ServiceEmployee.GetEmployees();
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
            var response = await _ServiceEmployee.RemoveEmployee(entity);
            if (response.StatusCode == Server.Response.StatusCode.OK)
            {
                return Ok(new { description = response.Description });
            }

            return BadRequest(new { ErrorMessage = response.Description });
        }

    }
}
