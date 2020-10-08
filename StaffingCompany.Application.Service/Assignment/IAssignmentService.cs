using StaffingCompany.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        bool AddAssignment(MvAssignment assignment);
        bool UpdateAssignment(MvAssignmentUpdate assignmentUpdate);
        dynamic GetAssignmentDetail();
    }
}
