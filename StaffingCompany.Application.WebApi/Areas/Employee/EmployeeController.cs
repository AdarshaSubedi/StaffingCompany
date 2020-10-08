using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Employee;
using StaffingCompany.Application.Service.Employee;
using StaffingCompany.Application.WebApi.Areas.Base;

namespace StaffingCompany.Application.WebApi.Areas.Employee
{
    public class EmployeeController : BaseController
    {
        private IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] MvEmployee employee)
        {
            try
            {
                var added = _employeeService.AddEmployee(employee);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [HttpPost]
        public IActionResult UpdateEmployee([FromBody] MvEmployeeUpdate employee)
        {
            try
            {
                var updated = _employeeService.UpdateEmployee(employee);
                if (!updated)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [HttpGet]
        public IActionResult EmployeeDetail()
        {
            try
            {
                dynamic jsonString = _employeeService.GetEmployeeDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
