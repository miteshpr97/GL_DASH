const winston = require("winston/lib/winston/config");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  winston.info(err);
};
