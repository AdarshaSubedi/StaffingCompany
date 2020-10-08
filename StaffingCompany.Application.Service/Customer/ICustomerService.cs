using StaffingCompany.Application.Model.Customer;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Customer
{
    public interface ICustomerService
    {
        bool AddCustomer(MvCustomer customer);
        bool UpdateCustomer(MvCustomerUpdate customerUpdate);
        dynamic GetCustomerDetail();
    }
}
