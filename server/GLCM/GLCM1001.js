const express = require("express");
const objJwtToken = require("jsonwebtoken");
const objCongig = require("../CommonConfig/config.json");
//const objJwtToken = require("../CommonUtil/auth");
const objEnCrpt = require("../CommonUtil/hash");

const dbUtil = require("../DBCall/DBUtil");
const glTryCach = require("../CommonUtil/GLtryCatch");
const router = express.Router();
//Login
router.post("/", (req, res) => {
  const strParaMeter = { USER_CD: req.body.USER_CD, PASS_CD: req.body.PASS_CD };
  console.log(strParaMeter);

  const resultCall = new Promise((resolve, reject) => {
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCM1001", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result from DB ", result);
    const dataResult = objEnCrpt.GlEncrypt(result);
    console.log(result);
    console.log(result[0]);
    console.log("Result Success ", result[0].SUCCESS_YN);
    if (result[0].SUCCESS_YN == "Y") {
      const tokenId = objJwtToken.sign(
        { id: result[0].USER_CD },
        objCongig.glJWTPriveteKey
      );
      console.log(dataResult);
      console.log(tokenId);
      res.header("x-gl-Auth-Token", tokenId).send(result); //
    } else {
      res.header("x-gl-Auth-Token", null).send(result); //
    }
  });
});





module.exports = router;
