const mongoose = require("mongoose");


//schema for records
const recordSchema = new mongoose.Schema({

drName: String,
uprn : String,
brief : String,
description : String,
created_date : String


})

//schema for uploads


const patientSchema = new mongoose.Schema({
    patientId : String,
  patientName: {
    type: String,
    required: true
  },
  created_uprn: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  bloodGroup: { type :String, required : true },
  records : [recordSchema],
});

const PatientDetails = mongoose.model("PatientDetails", patientSchema);

module.exports = PatientDetails;
