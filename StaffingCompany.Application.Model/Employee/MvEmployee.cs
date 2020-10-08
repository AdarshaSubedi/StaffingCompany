using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffingCompany.Application.Model.Employee
{
    public class MvEmployee
    {
        [Required]
        public string firstName { get; set; }
        public string middleName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string fullAddress { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }

    public class MvEmployeeUpdate
    {
        [Required]
        public int personId { get; set; }
        [Required]
        public string firstName { get; set; }
        public string middleName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string fullAddress { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }
}
