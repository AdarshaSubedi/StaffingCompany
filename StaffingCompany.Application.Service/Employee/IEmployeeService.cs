using StaffingCompany.Application.Model.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Employee
{
    public interface IEmployeeService
    {
        bool AddEmployee(MvEmployee employee);
        bool UpdateEmployee(MvEmployeeUpdate employeeUpdate);
        dynamic GetEmployeeDetail();
    }
}
