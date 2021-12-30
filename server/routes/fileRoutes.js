const express = require("express");
const router = express.Router();
const PatientDetails = require('../models/patientSchema')
const Uploads = require('../models/uploadSchema')
const path = require('path');
const {nanoid} = require('nanoid')
const fs = require('fs').promises




router.post('/upload', async (req, res)=>{

const { fileName } = req.body;
const dirName = path.dirname(__dirname);
const reqPath = path.join(dirName, '\\uploads\\', fileName )

req.on("data", async (chunk)=>{

await fs.appendFile(fileName, chunk.file)

})
res.status(200).json({message : "Chunk received"}).end()



})

router.post('/data', async (req, res)=>{

    const { patientId, uploadFileName, uploadTitle } = req.body

    const data = {

        patientId : patientId,
        uploads :  [{
            uploadTitle : uploadTitle,
            uploadFileName : uploadFileName
        }]

    }

    try{
        const patient = await Uploads.find({patientId : patientId})
        console.log(patient)
        if(patient.length){
            //add to the uploads array
            await Uploads.findOneAndUpdate({patientId : patientId}, {$push : { uploads : { $each : [data], $position : 0} }})
            res.status(200).json({message : "Posted successfully"}).end()
        }
        else {
            //create a new upload object
            const newUpload = new Uploads(data)
            await newUpload.save()
            res.status(200).json({message : "New uploads created in database"}).end()

        }
        
        
        
        }
        catch(e){
            console.log(e)

            res.status(500).json({message : "Something went wrong"}).end()
        }

})

router.get('/get-file', (req, res)=>{
    const dirName = path.dirname(__dirname);
    const reqPath = path.join(dirName, '\\uploads')
    console.log(nanoid())
})




module.exports = router