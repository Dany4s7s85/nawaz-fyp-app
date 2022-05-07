const patient = require("./dbConn");

function Purchase(req, res) {
    const pharm = patient(req.body);
    pharm.save();
    res.end();
}

module.exports = Purchase;
