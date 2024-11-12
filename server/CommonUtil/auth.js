/*const objJwtToken = require("jsonwebtoken");
const objConfig = require("config");

function funAuth(req, res, next) {
  const tokenCheck = req.header("x-auth-gl");
  if (!tokenCheck) res.status(401);
  try {
    const verifyData = objJwtToken.verify(
      tokenCheck,
      objConfig.get("glJWTPriveteKey")
    );
  } catch (ex) {
    res.status(400);
  }
}

module.exports = { funAuth };*/
