const express = require("express");
const router = express.Router();
const PatientDetails = require('../models/patientSchema')
const Uploads = require('../models/uploadSchema')
const path = require('path');
const {nanoid} = require('nanoid')
const fs = require('fs').promises



//* upload file route
router.post('/upload/:fileName', async (req, res)=>{

    const fileName = req.params.fileName
const dirName = path.dirname(__dirname);
const reqPath = path.join(dirName, '\\uploads\\', fileName )

req.on("data", async (chunk)=>{

await fs.appendFile(reqPath, chunk)

})
res.status(200).json({uploadFileName : fileName }).end()



})

//* data associated with the upload

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

            res.status(500).json({message : "Something went wrong"}).end()
        }

})

//* download the file
router.get('/get-file/:fileName', (req, res)=>{
    const dirName = path.dirname(__dirname);
    const reqPath = path.join(dirName, '\\uploads', req.params.fileName)
    res.sendFile(reqPath).end()
})




module.exports = router