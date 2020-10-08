using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Account;
using StaffingCompany.Application.Service.Account;
using StaffingCompany.Application.WebApi.Areas.Base;

namespace StaffingCompany.Application.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] MvLogin login)
        {
            try
            {
                dynamic jsonString = _accountService.GetLogin(login);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult UserDetail(string json)
        {
            try
            {
                dynamic jsonString = _accountService.GetUserDetail(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
