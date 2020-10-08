using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Account;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace StaffingCompany.Application.Service.Account
{
    public class AccountService : IAccountService
    {
        private DataAccessHelper _dataAccess;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuraiton;

        public AccountService(IConfiguration configuration)
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


        public dynamic GetLogin(MvLogin login)
        {
            using (var connection = _dataAccess.GetConnection())
            {
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpUserSel";
                command.Parameters.AddWithValue("@Email", login.Email);
                command.Parameters.AddWithValue("@Password", login.Password);
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

        public dynamic GetUserDetail(String json)
        {
            using (var connection = _dataAccess.GetConnection())
            {
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                dynamic jsonNew = JsonConvert.DeserializeObject(json);
                command.CommandText = "SpUserDetailSel";
                command.Parameters.AddWithValue("@UserId", Convert.ToString(jsonNew.userId));
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
