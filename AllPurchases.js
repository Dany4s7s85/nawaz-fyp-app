const patient = require("./dbConn");
async function DBdata(req, res) {
  const dbdata = await patient.find();
  res.write(JSON.stringify(dbdata));
  res.end();
}

module.exports = DBdata;
