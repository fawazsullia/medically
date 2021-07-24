const mongoose = require("mongoose");

const doctorUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  affiliated_hospital: {
    type: String,
    required: true
  },
  uprn: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  account_created: Date,
});

const DoctorDetails = mongoose.model("DoctorDetails", doctorUserSchema);

module.exports = DoctorDetails;
