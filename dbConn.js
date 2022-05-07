const mongoose = require("mongoose");

const DB =
  "mongodb://localhost:27017/pharmacy";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

//create schema for mongodb
const pharmacySchema = new mongoose.Schema({
  medicine: {
    type: String,
  },
  company: {
    type: String,
  },
  dose: {
    type: Number,
  },
  price: {
    type: Number,
  },
  date: {
    type: String,
  },
});

const patient = mongoose.model("patients", pharmacySchema);

module.exports = patient;
