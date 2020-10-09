using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffingCompany.Application.Model.Transaction
{
    public class MvTransaction
    {
        [Required]
        public int assignmentId { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }
}
