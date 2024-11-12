const msSqlconfig = {
  user: "sa_owm", // sql user
  password: "manager_owm@HR1", //sql user password
  server: "103.235.104.114", // if it does not work try- localhost
  database: "OWM.HRMS",
  options: {
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "MSSQLSERVER", // SQL Server instance name
  },
  port: 1433,
};

module.exports = msSqlconfig;
