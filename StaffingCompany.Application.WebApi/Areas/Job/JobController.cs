using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Job;
using StaffingCompany.Application.Service.Job;
using StaffingCompany.Application.WebApi.Areas.Base;

namespace StaffingCompany.Application.WebApi.Areas.Job
{
    public class JobController : BaseController
    {
        private IJobService _jobService;
        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public IActionResult AddJob([FromBody] MvJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _jobService.AddJob(job);
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
        public IActionResult UpdateJob([FromBody] MvJobUpdate job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updated = _jobService.UpdateJob(job);
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
        public IActionResult JobDetail()
        {
            try
            {
                dynamic jsonString = _jobService.GetJobDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
