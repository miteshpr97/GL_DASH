const config = require("./CommonConfig/config.json");
const express = require("express");
const objJwtToken = require("jsonwebtoken");
const objVerify = require("./CommonUtil/authVerify");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const msSqlUtility = require("./DBCall/SqlServerUtility");
const winston = require("winston/lib/winston/config");

if (!config.glJWTPriveteKey) {
  console.log("Fatal error: Jwe not defined" + config.glJWTPriveteKey);
  process.exit(1);
}

const app = express();
require("./CommonUtil/glLogs");
require("./StartUp/glRoute")(app);

console.log("login");

app.listen(5000, () => console.log("listening on 5000"));
