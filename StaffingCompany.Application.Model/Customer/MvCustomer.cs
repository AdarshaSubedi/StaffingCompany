using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StaffingCompany.Application.Model.Customer
{
    public class MvCustomer
    {
        [Required]
        public string organizationName { get; set; }
        [Required]
        public string organizationCategory { get; set; }
        [Required]
        public string organizationDescription { get; set; }
        [Required]
        public string fullAddress { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }

    public class MvCustomerUpdate
    {
        [Required]
        public int organizationId { get; set; }
        [Required]
        public string organizationName { get; set; }
        [Required]
        public string organizationCategory { get; set; }
        [Required]
        public string organizationDescription { get; set; }
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
