const express = require("express");
const sql = require("mysql");
var config = require("../DBConfig/mySQLConfig");
const util = require("util");

// async function Select_Query(strSqlSelectQuery) {
//   try {
//     console.log(config.db.host + " :" + config.db.database);
//     let pool = await sql.connect(config.db);
//     let resultSet = await pool.request().query(strSqlSelectQuery);
//     return resultSet.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function Select_Query(strSqlSelectQuery) {
  try {
    console.log(config.db.host + " :" + config.db.database);

    // Create a connection to the database
    const connection = sql.createConnection(config.db);

    // Promisify the query method
    const query = util.promisify(connection.query).bind(connection);

    // Execute the query
    const resultSet = await query(strSqlSelectQuery);
    console.log(resultSet);

    return resultSet;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function Select_SP(strSP_name, strParameter) {
  let pool = sql.createConnection(config.db);
  try {
    //Query Data only
    console.log("strSP_name:" + strSP_name);
    console.log(config.db.host + " :" + config.db.database);
    console.log("Parameter:" + strParameter);

    const keyTemp = [];
    const sqlSpPara = [];
    const keyValue = [];
    if (strParameter && typeof strParameter === "object") {
      Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        sqlSpPara.push("?");
        keyTemp.push("i_" + key);
        keyValue.push(value);
      });
    }

    console.log("Key Temp :", keyTemp);
    console.log("Key SP Para :", sqlSpPara);
    console.log("Key Value :", keyValue);

    let sqlMainSp = strSP_name;
    // if (keyTemp.length > 0) {
    //   sqlMainSp =
    //     sqlMainSp + "(" + sqlSpPara.join() + ",@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)";
    // }
    if (keyTemp.length > 0) {
      sqlMainSp = `${strSP_name}(${sqlSpPara.join()},@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)`;
    } else {
      // No input parameters
      sqlMainSp = `${strSP_name}(@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)`;
    }
    let spPass = "CALL " + sqlMainSp;
    //End
    //Start DB Connection..................

    selectDataResult = () => {
      return new Promise((resolve, reject) => {
        pool.query(spPass, keyValue, (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          console.log("Result final: ", result);

          return resolve(result[0]);
        });
      });
    };
    //End Of DB....................

    //Result Data
    const result = await selectDataResult();
    pool.end();
    console.log(result);
    return result;
    ///End Data......................
  } catch (error) {
    pool.end();
    console.log(error);
  }
}

async function Save_SP(strSP_name, strParameter) {
  let pool = sql.createConnection(config.db);
  try {
    //Query Data only
    console.log("strSP_name:" + strSP_name);
    console.log(config.db.host + " :" + config.db.database);
    console.log("Parameter:" + strParameter);

    const keyTemp = [];
    const sqlSpPara = [];
    const keyValue = [];
    if (strParameter != "") {
      let entries = Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        sqlSpPara.push("?");
        keyTemp.push("i_" + key);
        keyValue.push(value);
      });
    }

    console.log("Key Temp :", keyTemp);
    console.log("Key SP Para :", sqlSpPara);
    console.log("Key Value :", keyValue);

    let sqlMainSp = strSP_name;
    if (keyTemp.length > 0) {
      sqlMainSp =
        sqlMainSp + "(" + sqlSpPara.join() + ",@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)";
    }
    let spPass = "CALL " + sqlMainSp;
    //End
    //Start DB Connection..................

    selectDataResult = () => {
      return new Promise((resolve, reject) => {
        pool.query(spPass, keyValue, (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          console.log("Result final: ", result);

          return resolve(result[0]);
        });
      });
    };
    //End Of DB.......................

    //Result Data
    const result = await selectDataResult();
    pool.end();
    console.log("Result Final from MySql: ", result);
    return result;
    ///End Data......................
  } catch (error) {
    pool.end();
    console.log(error);
  }
}

async function Save_SP(strSP_name, strParameter) {
  try {
    // Query Data only
    console.log("strSP_name:" + strSP_name);
    console.log(config.db.host + " :" + config.db.database);
    console.log("Parameter:" + strParameter);

    const keyTemp = [];
    const sqlSpPara = [];
    const keyValue = [];
    if (strParameter != "") {
      Object.entries(strParameter).forEach(([key, value]) => {
        console.log("Key :" + key);
        console.log("Values :" + value);
        sqlSpPara.push("?");
        keyTemp.push("i_" + key);
        keyValue.push(value);
      });
    }

    console.log("Key Temp :", keyTemp);
    console.log("Key SP Para :", sqlSpPara);
    console.log("Key Value :", keyValue);

    let sqlMainSp = strSP_name;
    if (keyTemp.length > 0) {
      sqlMainSp =
        sqlMainSp + "(" + sqlSpPara.join() + ",@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)";
    }
    let spPass = "CALL " + sqlMainSp;
    // End
    // Start DB Connection..................
    let pool = sql.createConnection(config.db);
    selectDataResult = () => {
      return new Promise((resolve, reject) => {
        pool.query(spPass, keyValue, (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          console.log("Result final: ", result);

          pool.query(
            "SELECT @O_ERR_LVL as O_ERR_LVL, @O_ERR_CD as O_ERR_CD, @O_ERR_NM as O_ERR_NM",
            (err, outParams) => {
              if (err) {
                return reject(err);
              }
              return resolve({ result: result[0], output: outParams[0] });
            }
          );
        });
      });
    };
    // End Of DB.......................

    // Result Data
    const result = await selectDataResult();
    console.log("Result Final from MySql: ", result);
    return result;
    // End Data......................
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Select_Query, Select_SP, Save_SP };
