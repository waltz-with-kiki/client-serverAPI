using test.Server.Configuration.Classes;
using test.Server.DAL.Interfaces;
using test.Server.Models;
using test.Server.Response;
using test.Server.Response.Intefaces;
using test.Server.Services.Interfaces;

namespace test.Server.Services
{
    public class EmployeeService :IEmployeeService
    {
        private readonly IRepository<Employee> _RepEmployees;

        public EmployeeService(IRepository<Employee> employeeRepository)
        {
            _RepEmployees = employeeRepository;
        }

        public async Task<IBaseResponse<Employee>> AddNewEmployee(NewEmployeeWithoutId employee)
        {
            var require = _RepEmployees.Items.Where(x => x.Name == employee.Name && x.Surname == employee.Surname && x.Patronymic == employee.Patronymic).FirstOrDefault();
            if(require != null)
            {
                return new BaseResponse<Employee>()
                {
                    Description = "Такой сотрудник уже существует",
                    StatusCode = StatusCode.BaseError
                };
            }

            Employee newemployee = new Employee { Name = employee.Name, Surname = employee.Surname, Patronymic = employee.Patronymic, Email = employee.Email };
            await _RepEmployees.AddAsync(newemployee);

            return new BaseResponse<Employee>()
            {
                Description = "Сотрудник успешно создан",
                StatusCode = StatusCode.OK
            };
        }

        public async Task<IBaseResponse<Employee>> ChangeEmployee(NewEmployee employee)
        {

            var changeEmployee = await _RepEmployees.GetAsync(employee.Id);

            if (changeEmployee == null)
            {
                return new BaseResponse<Employee>()
                {
                    Description = "Сотрудник не найден",
                    StatusCode = StatusCode.NotFound
                };
            }

            var require = _RepEmployees.Items.Where(x => x.Name == employee.Name && x.Surname == employee.Surname && x.Patronymic == employee.Patronymic && x.Id != employee.Id).FirstOrDefault();
            if (require != null)
            {
                return new BaseResponse<Employee>()
                {
                    Description = "Такой сотрудник уже существует",
                    StatusCode = StatusCode.BaseError
                };
            }

            changeEmployee.Name = employee.Name;
            changeEmployee.Surname = employee.Surname;
            changeEmployee.Patronymic = employee.Patronymic;
            changeEmployee.Email = employee.Email;

            await _RepEmployees.UpdateAsync(changeEmployee);

            return new BaseResponse<Employee>()
            {
                Description = "Сотрудник успешно изменён",
                StatusCode = StatusCode.OK
            };

        }



    }
}
