const express = require("express");
const glErrors = require("../CommonUtil/glErrors");
const objVerify = require("../CommonUtil/authVerify");
const apiLogin = require("../GLCM/GLCM1001");
const apiMenu = require("../GLCM/GLCM1003");
const apiAccessRight = require("../GLCM/GLCM1004");
const apiUserCreation = require("../GLCM/GLCMA100100");
const apiPageGLCMA100200 = require("../GLCM/GLCMA100200");
const apiPageGLCMA100300 = require("../GLCM/GLCMA100300");
const apiPageGLAMT100100 = require("../GLCM/GLAMT100100");
const apiPageGLAMA100100 = require("../GLCM/GLAMA100100");
const apiOfCommonDropdown = require("../GLCM/GLCWP100100");

require("express-async-errors");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/login", apiLogin);
  app.use("/api/Menu", apiMenu);
  app.use("/api/AccessRight", apiAccessRight);
  app.use("/api/UserCreation", apiUserCreation);
  app.use("/api/GLCMA100200", apiPageGLCMA100200);
  app.use("/api/GLCMA100300", apiPageGLCMA100300);
  app.use("/api/GLAMT100100", apiPageGLAMT100100);
  app.use("/api/GLAMA100100", apiPageGLAMA100100);
  app.use("/api/GLCWP100100", apiOfCommonDropdown);
  app.use(glErrors);
};
