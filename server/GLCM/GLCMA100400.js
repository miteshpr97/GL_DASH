const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();

// Adding a menu
router.post("/", async (req, res) => {
    console.log("Add or update menu");
  
    const strParaMeter = {
      MODULE_CD: req.body.MODULE_CD,
      MENU_CD: req.body.MENU_CD,
      MENU_NM: req.body.MENU_NM,
      PAGE_CD: req.body.PAGE_CD,
      PAGE_NM: req.body.PAGE_NM,
      PAGE_ID: req.body.PAGE_ID,
      RSTATUS: req.body.RSTATUS,
      ICON_PAGE: req.body.ICON_PAGE,
      ICON_MODULE: req.body.ICON_MODULE,
      ICON_MENU: req.body.ICON_MENU,
      PAGE_LNK: req.body.PAGE_LNK,
      REG_BY: req.body.REG_BY,
      ACTIVE_YN: req.body.ACTIVE_YN,
    };

    console.log(strParaMeter);
  
    try {
      const result = await dbUtil.dbUtil_Temp.Save_SP(
        "SP_GLCMA100400_01",
        strParaMeter
      );
      console.log("Result", result);
      res.status(201).json({ message: "Menu added successfully", result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "An error occurred while adding menu." });
    }
});

// Getting menu
router.post("/get", async (req, res) => {
    console.log("Getting menu");

    const strParaMeter = {
        MODULE_CD: req.body.MODULE_CD,
        SERACH_TEXT: req.body.SERACH_TEXT,
        REG_BY: req.body.REG_BY,
        };
  
    try {
      const result = await dbUtil.dbUtil_Temp.Select_SP(
        "SP_GLCMA100400_02",
        strParaMeter
    );
      console.log("Result", result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: "An error occurred while getting menu." });
    }
});

module.exports = router;