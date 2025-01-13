const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// getting code number based on module code
router.post("/codeNo", async(req,res) => {
  const strParaMeter = {
    MODULE_CD : req.body.MODULE_CD,
    SER_TEXT : req.body.SER_TEXT,
    REG_BY : req.body.REG_BY
  }; 
  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100300_01" , strParaMeter);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while getting specific user detail." });
  }
});

// getting details based on code number & module code
router.post("/data", async(req,res) => {
    const strParaMeter = {
      MODULE_CD : req.body.MODULE_CD,
      CODE_NO : req.body.CODE_NO,
      REG_BY : req.body.REG_BY
    }; 
    try {
      const result = await dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100300_02" , strParaMeter);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "An error occurred while getting specific user detail." });
    }
});

// Add or update details
router.post("/", async (req, res) => {
  console.log("AddOrUpdateDetails");

  const strParaMeter = {
    M_DVN: req.body.M_DVN,
    C_DVN: req.body.C_DVN,
    CODE_NO: req.body.CODE_NO,
    CODE_NM: req.body.CODE_NM,
    CODE_NMH: req.body.CODE_NMH,
    CODE_NMA: req.body.CODE_NMA,
    CODE_NMO: req.body.CODE_NMO,
    SUB_GUN1: req.body.SUB_GUN1,
    SUB_GUN2: req.body.SUB_GUN2,
    SUB_GUN3: req.body.SUB_GUN3,
    SUB_GUN4: req.body.SUB_GUN4,
    SUB_GUN5: req.body.SUB_GUN5,
    SORT_BY: req.body.SORT_BY,
    RMKS: req.body.RMKS,
    REG_BY: req.body.REG_BY,
};

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLCMA100300_03",
      strParaMeter
    );
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding details." });
  }
});

module.exports = router;