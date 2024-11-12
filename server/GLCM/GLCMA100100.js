const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// Registering a user
router.post("/", async (req, res) => {
  console.log("RegisterUser");

  const strParaMeter = {
    EMP_CD: req.body.EMP_CD,
    EMP_FNM: req.body.EMP_FNM,
    EMP_SNM: req.body.EMP_SNM,
    EMP_MNM: req.body.EMP_MNM,
    EMP_LNM: req.body.EMP_LNM,
    POS_CD: req.body.POS_CD,
    DEPT_CD: req.body.DEPT_CD,
    EMAIL: req.body.EMAIL,
    EMAIL_PER: req.body.EMAIL_PER,
    MOB_NO_01: req.body.MOB_NO_01,
    MOB_PER_01: req.body.MOB_PER_01,
    MOB_NO_02: req.body.MOB_NO_02,
    MOB_PER_02: req.body.MOB_PER_02,
    EMP_TP: req.body.EMP_TP,
    REF_NO: req.body.REF_NO,
    STATUS: req.body.STATUS,
    DATE_JOIN: req.body.DATE_JOIN,
    DATE_BIRTH: req.body.DATE_BIRTH,
    GENDER: req.body.GENDER,
    RELIGION: req.body.RELIGION,
    ADD_01: req.body.ADD_01,
    ADD_STATE: req.body.ADD_STATE,
    ADD_LANDMARK: req.body.ADD_LANDMARK,
    ADD_CITY: req.body.ADD_CITY,
    ADD_PIN: req.body.ADD_PIN,
    PAN_CARD: req.body.PAN_CARD,
    NATION_ID: req.body.NATION_ID,
    REG_BY: req.body.REG_BY,
    REG_DATE: req.body.REG_DATE,
    UPD_BY: req.body.UPD_BY,
    UPD_DATE: req.body.UPD_DATE,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLCMA100100",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while registering the user." });
  }
});

router.get("/:EMP_CD", async (req, res) => {
  console.log("Menu");
  const resultCall = new Promise((resolve, reject) => {
    const strParaMeter = {
      EMP_CD: req.params.EMP_CD,
    };
    console.log("Para 1", strParaMeter);
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100100_01", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result", result);
    res.send(result);
  });
});

router.get("/", async (req, res) => {
  console.log("Menu");
  const resultCall = new Promise((resolve, reject) => {
    const strParaMeter = {
      EMP_CD: req.params.EMP_CD,
    };
    console.log("Para 1", strParaMeter);
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100100_01", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result", result);
    res.send(result);
  });
});

// getting all users as well as details of specific user
/*router.get("/", async (req, res) => {
  console.log("GettingAllUsers");

  const strParaMeter = {
    EMP_CD: req.query.EMP_CD || ''
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP("SP_GLCMA100100_01", strParaMeter);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while registering the user." });
  }
});*/

module.exports = router;
