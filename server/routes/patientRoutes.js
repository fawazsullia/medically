const express = require("express");
const router = express.Router();
const PatientDetails = require('../models/patientSchema')
const sendEmail = require('../sendEmail')
const { nanoid } = require('nanoid')

//creating a new patient here
router.post('/register-patient', async (req,res)=> {

const { patientName,patientEmail,patientPhone,bloodGroup,uprn } = req.body
try{
const patientExists = await PatientDetails.find({ patientPhone : patientPhone })

if(patientExists <1 ){
let id = await nanoid(10)
const newPatient = new PatientDetails({
       patientId : id,
    patientName:patientName,
      created_uprn: uprn,
      patientEmail: patientEmail,
      patientPhone: patientPhone,
      bloodGroup: bloodGroup,
      records : []

})

await newPatient.save()
await sendEmail(patientEmail, id)
await res.status(200).json({ status : true, message : "Patient registered", id : id }).end()

}
else {  res.status(404).json({  status : false, message: "Patient Record exists"  }).end()      }
}
catch(err){

    res.status(500).json({ status : false, message : "Patient not registered. Try again" }).end()

}

})

//search for a patient
router.post('/search-patient', async (req,res)=> {

const {patientId} = req.body
try{

const patient = await PatientDetails.findOne({ patientId : patientId })

if(patient){

await res.status(200).json({ status : true, message : "Patient found", patient : patient }).end()


}
else {   await res.status(404).json({status: false, message: "Invalid id"}).end() }
}
catch(err){
    res.status(500).json({status : false, message: "Oops. Somethign bad happened"}).end()
}

})

// create patient history records here
router.post('/create-record', async (req,res)=> {

const { drName,uprn ,brief,description,date,patientId } = req.body
const data = {
    drName : drName,
    uprn : uprn,
    brief : brief,
    description : description,
    created_date : date,
}
try{
await PatientDetails.findOneAndUpdate({ patientId : patientId }, {$push : { records : { $each : [data], $position : 0} }})
await res.status(200).json({ status : true, message : "Record created successfully" }).end()
}
catch(err){
    await res.status(500).json({ status : false, message : "Record not created. Try again" }).end()
}

})



module.exports = router
