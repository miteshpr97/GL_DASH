const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();
/**
 *@swagger
 * /AccessRights:
 *   get:
 *   description: List All Menu
 *   responses:
 *     200:
 *       description: success
 *
 */
//Access Rights For employee for Page...
router.post("/", (req, res) => {
  console.log("AccessRights");
  const resultCall = new Promise((resolve, reject) => {
    const strParaMeter = {
      USER_CD: req.body.USER_CD,
      PAGE_CD: req.body.PAGE_CD,
    };
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCM1003", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result", result);
    res.send(result);
  });
});

module.exports = router;
