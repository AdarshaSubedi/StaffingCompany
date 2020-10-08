using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace StaffingCompany.Application.Service.Assignment
{
    public class AssignmentService : IAssignmentService
    {

        private DataAccessHelper _dataAccess;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuraiton;

        public AssignmentService(IConfiguration configuration)
        {
            _configuraiton = configuration;
            dynamic connectionString = _configuraiton.GetSection("ConnectionString");
            _connectionString = connectionString["DefaultConnection"];

            if (_connectionString != null)
            {
                _dataAccess = new DataAccessHelper(_connectionString);
            }

            _commandTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }

        public bool AddAssignment(MvAssignment assignment)
        {
            using (var connection = _dataAccess.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(assignment);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpAssignmentIns";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _commandTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }

        public bool UpdateAssignment(MvAssignmentUpdate assignmentUpdate)
        {
            using (var connection = _dataAccess.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(assignmentUpdate);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpAssignmentUpd";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _commandTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }


        public dynamic GetAssignmentDetail()
        {
            using (var connection = _dataAccess.GetConnection())
            {
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpAssignmentSel";
                command.CommandTimeout = _commandTimeout;

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return _dataAccess.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

    }
}
