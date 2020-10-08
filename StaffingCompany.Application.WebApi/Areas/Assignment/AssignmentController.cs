using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Assignment;
using StaffingCompany.Application.Service.Assignment;
using StaffingCompany.Application.WebApi.Areas.Base;

namespace StaffingCompany.Application.WebApi.Areas.Assignment
{
    public class AssignmentController : BaseController
    {
        private IAssignmentService _assignmentService;
        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost]
        public IActionResult AddAssignment([FromBody] MvAssignment assignment)
        {
            try
            {
                var added = _assignmentService.AddAssignment(assignment);
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
        public IActionResult UpdateAssignment([FromBody] MvAssignmentUpdate assignment)
        {
            try
            {
                var updated = _assignmentService.UpdateAssignment(assignment);
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
        public IActionResult AssignmentDetail()
        {
            try
            {
                dynamic jsonString = _assignmentService.GetAssignmentDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
