const express = require("express");
const objJwtToken = require("../CommonUtil/auth");
const objEnCrpt = require("../CommonUtil/hash");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

//To get all user-Related Information
router.post("/", objVerify, async (req, res) => {
  const strParaMeter = { USER_ID: req.body.id };
  const resultCall = new Promise((resolve, reject) => {
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCM1002", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result", result);
    objJwtToken.funAuth();
    const dataResult = objEnCrpt.GlEncrypt(result);
    console.log(dataResult);
    res.send(result);
  });
});

module.exports = router;
