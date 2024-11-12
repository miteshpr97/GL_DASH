const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// Add a customer
router.post("/", async (req, res) => {
  console.log("AddCustomer");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    CUST_NM: req.body.CUST_NM,
    COUNTRY_CD: req.body.COUNTRY_CD,
    CUST_ADD: req.body.CUST_ADD,
    EMAIL: req.body.EMAIL,
    WEBSITE: req.body.WEBSITE,
    CR_NO: req.body.CR_NO,
    COMPANY_TYPE: req.body.COMPANY_TYPE,
    ACTIVE_YN: req.body.ACTIVE_YN,
    REG_BY: req.body.REG_BY,
    CUST_TYPE: req.body.CUST_TYPE,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLAMA100100_01",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding a customer." });
  }
});

// Get customer details
router.post("/details", async (req, res) => {
  console.log("GetCustomerDetails");

  const strParaMeter = {
    FROM_DTE: req.body.FROM_DTE,
    TO_DTE: req.body.TO_DTE,
    CUST_TYPE: req.body.CUST_TYPE,
    TEXT_SEARCH: req.body.TEXT_SEARCH,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP(
      "SP_GLAMA100100_02",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching a customer details." });
  }
});

// Add a customer bank info
router.post("/bank", async (req, res) => {
  console.log("AddCustomerBankDetails");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    SEQ_NO: req.body.SEQ_NO,
    BANK_ACC_NO: req.body.BANK_ACC_NO,
    BANK_NM: req.body.BANK_NM,
    BANK_BRACH: req.body.BANK_BRACH,
    IFSC_CD: req.body.IFSC_CD,
    SWIFT_CD: req.body.SWIFT_CD,
    BANK_ADD: req.body.BANK_ADD,
    COUNTRY_CD: req.body.COUNTRY_CD,
    ACTIVE_YN: req.body.ACTIVE_YN,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLAMA100100_03",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: "An error occurred while adding a customer bank details.",
      });
  }
});

// Get customer bank details
router.post("/bankDetails", async (req, res) => {
  console.log("GetCustomerBankDetails");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP(
      "SP_GLAMA100100_04",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: "An error occurred while fetching customer's bank details.",
      });
  }
});

// Add a customer tax info
router.post("/tax", async (req, res) => {
  console.log("AddCustomerTaxDetails");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    SEQ_NO: req.body.SEQ_NO,
    VAT_NO: req.body.VAT_NO,
    ACTIVE_YN: req.body.ACTIVE_YN,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLAMA100100_05",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: "An error occurred while adding a customer's tax details.",
      });
  }
});

// Get customer tax details
router.post("/taxDetails", async (req, res) => {
  console.log("GetCustomerBankDetails");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP(
      "SP_GLAMA100100_06",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: "An error occurred while fetching a customer's tax details",
      });
  }
});

// Add a customer contact info
router.post("/contact", async (req, res) => {
  console.log("AddCustomerContactInfo");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    SEQ_NO: req.body.SEQ_NO,
    CONTACT_PERSON: req.body.CONTACT_PERSON,
    CONTACT_NO: req.body.CONTACT_NO,
    EMAIL: req.body.EMAIL,
    DESIGNATION: req.body.DESIGNATION,
    ACTIVE_YN: req.body.ACTIVE_YN,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Save_SP(
      "SP_GLAMA100100_07",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: "An error occurred while adding a customer's contact details.",
      });
  }
});

// Get customer contact details
router.post("/contactDetails", async (req, res) => {
  console.log("GetCustomerContactDetails");

  const strParaMeter = {
    REF_NO: req.body.REF_NO,
    REG_BY: req.body.REG_BY,
  };

  try {
    const result = await dbUtil.dbUtil_Temp.Select_SP(
      "SP_GLAMA100100_08",
      strParaMeter
    );
    console.log("Result", result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: "An error occurred while fetching a customer's contact details",
      });
  }
});

module.exports = router;
