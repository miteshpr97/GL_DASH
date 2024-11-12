const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// Add a transaction
router.post("/", async (req, res) => {
  console.log("AddTransaction");

  const strParaMeter = {
    REF_TNO: req.body.REF_TNO,
    REF_TYPE: req.body.REF_TYPE,
    REF_NO: req.body.REF_NO,
    REF_DESC: req.body.REF_DESC,
    RMKS: req.body.RMKS,
    LCURR_CD: req.body.LCURR_CD,
    LAMT: req.body.LAMT,
    EXCHANGE_RATE: req.body.EXCHANGE_RATE, 
    FCURR_CD: req.body.FCURR_CD,
    FAMT: req.body.FAMT,
    DOC_DTE: req.body.DOC_DTE,
    POST_DTE: req.body.POST_DTE,
    REG_DATE: req.body.REG_DATE,
    REG_BY: req.body.REG_BY,
    UPD_BY: req.body.UPD_BY,
    UPD_DATE: req.body.UPD_DATE,
    DOC_STATUS: req.body.DOC_STATUS,
    YEAR_CD: req.body.YEAR_CD,
};


  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLAMT100100_01",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding a transaction." });
  }
});

// Get transaction details
router.post("/details", async (req, res) => {
  console.log("GetTransactionDetails");

  const strParaMeter = {
    SER_TXT: req.body.SER_TXT,
    REF_TYPE: req.body.REF_TYPE,
    FRM_DTE: req.body.FRM_DTE,
    TO_DTE: req.body.TO_DTE,
    REG_BY: req.body.REG_BY,
};

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP(
      "SP_GLAMT100100_02",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching a transaction." });
  }
});

module.exports = router;