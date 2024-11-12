const objCOnfig = require("../CommonConfig/config.json");
const objJwt = require("jsonwebtoken");

function checkVerify(req, res, next) {
  //res.set("Access-Control-Allow-Origin", "*");
  const tokeId = req.header("x-gl-Auth-Token");
  console.log("Md start" + tokeId);
  if (!tokeId) return res.status(401).send("No token Found");
  try {
    const decodedToken = objJwt.verify(tokeId, objCOnfig.glJWTPriveteKey);
    console.log("Md" + decodedToken);
    req.id = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}  

module.exports = checkVerify;
