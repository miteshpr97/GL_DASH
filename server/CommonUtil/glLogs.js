const winston = require("winston/lib/winston/config");
require("express-async-errors");
module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: "unhandleException.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "error.log" });
};
