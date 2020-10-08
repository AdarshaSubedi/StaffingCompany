using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace StaffingCompany.Application.DataAccess
{
    public class DataAccessHelper
    {
        private SqlConnection _connection;
        private string _connectionString;

        public DataAccessHelper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _connection;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void SetConnection()
        {
            _connection = new SqlConnection(_connectionString);
            if (_connection.State == ConnectionState.Closed)
            {
                _connection.Open();
            }
            else
            {
                _connection.Close();
                _connection.Open();
            }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
            var dataTable = new DataTable();
            dataTable.Load(reader);

            if (dataTable.Rows[0] != null && dataTable.Rows[0]["Json"].ToString() != "")
            {
                return JsonConvert.DeserializeObject(dataTable.Rows[0]["Json"].ToString());
            }
            else
            {
                return null;
            }
        }

    }
}
