using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StaffingCompany.Application.Service.Account;
using StaffingCompany.Application.Service.Assignment;
using StaffingCompany.Application.Service.Customer;
using StaffingCompany.Application.Service.Employee;
using StaffingCompany.Application.Service.Job;
using StaffingCompany.Application.Service.Transaction;

namespace StaffingCompany.Application.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore().AddNewtonsoftJson();
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy(
                  name: "AllowOrigin",
                  builder => builder.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddTransient<ICustomerService, CustomerService>();
            services.AddTransient<IJobService, JobService>();
            services.AddTransient<IAssignmentService, AssignmentService>();
            services.AddTransient<ITransactionService, TransactionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowOrigin");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("AllowOrigin");
            });
        }
    }
}
