const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// Common dropdown
router.post("/dropdown",async(req,res) => {
  const strParaMeter = {
    MODULE_CD : req.body.MODULE_CD,
    CODE_NO : req.body.CODE_NO,
    REG_BY : req.body.REG_BY,
    ACTIVE_YN : req.body.ACTIVE_YN
  }; 
  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100300_04" , strParaMeter);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while getting common dropdown." });
  }
});

module.exports = router;