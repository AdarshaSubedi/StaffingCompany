using StaffingCompany.Application.Model.Job;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Job
{
    public interface IJobService
    {
        bool AddJob(MvJob job);
        bool UpdateJob(MvJobUpdate jobUpdate);
        dynamic GetJobDetail();
    }
}
