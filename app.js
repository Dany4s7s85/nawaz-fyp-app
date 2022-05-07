const express = require("express");
const app = express();
const patient = require("./dbConn");
const RowDelete = require("./deleteDoc");
const DBdata = require("./AllPurchases");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var path = require("path");
const Purchase = require("./purchages");
app.use(cookieParser());
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

// save data in data base
app.post("/datasave",Purchase)

// save data in data base
app.post("/delete",RowDelete);

// complete purchases
app.get("/alldata",DBdata);

//this is for heroku don,t touch
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
  console.log("listen port 5000");
});