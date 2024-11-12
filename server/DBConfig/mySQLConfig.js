const mySqlConfig = {
  db: {
    user: "admin_globus", // sql user
    password: "admin@PWD@123", //sql user password
    host: "103.145.50.213", // if it does not work try- localhost
    database: "globus_demo",
    connectTimeout: 60000,
    multipleStatements: true,
  },
};

module.exports = mySqlConfig;
