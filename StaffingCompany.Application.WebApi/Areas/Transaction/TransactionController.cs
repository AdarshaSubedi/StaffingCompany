using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Transaction;
using StaffingCompany.Application.Service.Transaction;
using StaffingCompany.Application.WebApi.Areas.Base;

namespace StaffingCompany.Application.WebApi.Areas.Transaction
{
    public class TransactionController : BaseController
    {
        private ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public IActionResult AddTransaction([FromBody] MvTransaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _transactionService.AddTransaction(transaction);
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


        [HttpGet]
        public IActionResult TransactionDetail()
        {
            try
            {
                dynamic jsonString = _transactionService.GetTransactionDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
