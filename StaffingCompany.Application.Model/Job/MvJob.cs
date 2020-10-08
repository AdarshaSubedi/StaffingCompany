using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffingCompany.Application.Model.Job
{
    public class MvJob
    {
        [Required]
        public string jobTitle { get; set; }
        [Required]
        public decimal payPerHour { get; set; }
        [Required]
        public int customerId { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }

    public class MvJobUpdate
    {
        [Required]
        public int jobId { get; set; }
        [Required]
        public string jobTitle { get; set; }
        [Required]
        public decimal payPerHour { get; set; }
        [Required]
        public int customerId { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }
}
