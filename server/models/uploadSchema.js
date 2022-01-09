const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema({

    uploadTitle : String,
    uploadFileName : String,
    uploadDate : Date
    
    })

    const uploadSchema = new mongoose.Schema({

        patientId : String,
        uploads : [uploadFileSchema]

    })

    const Uploads = mongoose.model('Uploads', uploadSchema)

    module.exports = Uploads;