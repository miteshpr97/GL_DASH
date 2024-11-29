const express = require("express");
const sql = require("mssql");
var config = require("../DBConfig/sqlServerConfig");

async function Select_Query(strSqlSelectQuery) {
  try {
    console.log(config.server + " :" + config.database);
    let pool = await sql.connect(config);
    let resultSet = await pool.request().query(strSqlSelectQuery);
    return resultSet.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function Select_SP(strSP_name, strParameter) {
  try {
    console.log("strSP_name:" + strSP_name);
    console.log(config.server + " :: " + config.database);
    console.log("Parameter:" + strParameter);

    let pool = await sql.connect(config);
    let reqObj = pool.request();
    console.log(strParameter);
    

    if (strParameter != "") {
    console.log(strParameter);

      let entries = Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        reqObj.input("i_" + key, value);
      });
    }
    reqObj.output("O_ERR_LVL");
    reqObj.output("O_ERR_CD");
    reqObj.output("O_ERR_NM");
    let resultSet = await reqObj.execute(strSP_name);
    if (resultSet.output.O_ERR_LVL == 0) {
      console.log(resultSet.recordsets[0]);
      return resultSet.recordsets[0];
    } else {
      console.log(resultSet.output.O_ERR_LVL);
      console.log(resultSet.output.O_ERR_CD);
      console.log(resultSet.output.O_ERR_NM);
      return resultSet.output;
    }
  } catch (error) {
    console.log(error);
  }
}

async function Save_SP(strSP_name, strParameter) {
  try {
    console.log("strSP_name:" + strSP_name);
    console.log(config.server + " :: " + config.database);
    console.log("Parameter:" + strParameter);

    let pool = await sql.connect(config);
    let reqObj = pool.request();

    if (strParameter != "") {
      let entries = Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        reqObj.input("i_" + key, value);
      });
    }
    reqObj.output("O_ERR_LVL");
    reqObj.output("O_ERR_CD");
    reqObj.output("O_ERR_NM");
    let resultSet = await reqObj.execute(strSP_name);
    if (resultSet.output.O_ERR_LVL == 0) {
      console.log(resultSet.recordsets);
      return resultSet.recordsets;
    } else {
      console.log(resultSet.output.O_ERR_LVL);
      console.log(resultSet.output.O_ERR_CD);
      console.log(resultSet.output.O_ERR_NM);
      return resultSet.output;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Select_Query, Select_SP, Save_SP };
