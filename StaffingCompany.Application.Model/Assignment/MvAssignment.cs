using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffingCompany.Application.Model.Assignment
{
    public class MvAssignment
    {
        [Required]
        public int employeeId { get; set; }
        [Required]
        public int jobId { get; set; }
        [Required]
        public bool status { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }

    public class MvAssignmentUpdate
    {
        [Required]
        public int assignmentId { get; set; }
        [Required]
        public int employeeId { get; set; }
        [Required]
        public int jobId { get; set; }
        [Required]
        public bool status { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }
}
