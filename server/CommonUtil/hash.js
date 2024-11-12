const bcryptObj = require("bcrypt");
async function GlEncrypt() {
  const salt = await bcryptObj.genSalt(10);
  console.log(salt);
}

module.exports = { GlEncrypt };
