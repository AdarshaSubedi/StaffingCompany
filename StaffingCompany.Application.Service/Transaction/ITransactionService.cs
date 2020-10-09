using StaffingCompany.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Transaction
{
    public interface ITransactionService
    {
        bool AddTransaction(MvTransaction transaction);
        dynamic GetTransactionDetail();
    }
}
