const express = require("express");
const router = express.Router();
const PatientDetails = require("../models/patientSchema");
const Uploads = require("../models/uploadSchema");
const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "indiagoesremote",
  api_key: "586198561628276",
  api_secret: "1GCzIudNsAw8un-DHYMxUD7EVI8",
  secure: true,
});

//* upload file route
router.post("/upload/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const file = req.files[fileName];

  let pa = path.join(__dirname, "..\\", "uploads\\", fileName);
  file.mv(pa, (err) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" }).end();
    } else {
      cloudinary.uploader.upload(`${pa}`, function (error, result) {
        if (error) {
          res.status(500).json({ message: "something went wrong" }).end();
        } else {
          res.status(200).json({ downloadUrl: result.secure_url }).end();
        }
      });
    }
  });
});

//* data associated with the upload

router.post("/data", async (req, res) => {
  const { patientId, downloadUrl, uploadTitle } = req.body;

  const data = {
    patientId: patientId,
    uploads: [
      {
        uploadTitle: uploadTitle,
        downloadUrl: downloadUrl,
        uploadDate: new Date(),
      },
    ],
  };

  try {
    const patient = await Uploads.find({ patientId: patientId });
    if (patient.length) {
      //add to the uploads array
      await Uploads.findOneAndUpdate(
        { patientId: patientId },
        { $push: { uploads: data.uploads[0] } }
      );
      res.status(200).json({ message: "Posted successfully" }).end();
    } else {
      //create a new upload object
      const newUpload = new Uploads(data);
      await newUpload.save();
      res
        .status(200)
        .json({ message: "New uploads created in database" })
        .end();
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" }).end();
  }
});

//* get the uploads of a particular patient
router.get("/get-uploads/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const checkIfUploads = await Uploads.findOne({ patientId: patientId });
    if (checkIfUploads) {
      //give back the uploads back
      const data = await Uploads.findOne({ patientId: patientId });
      res.status(200).json(data).end();
    } else {
      //return 404 error
      res.status(404).json({ message: "No uploads found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" }).end();
  }
});

//* download the file
router.get("/get-file/:fileName", (req, res) => {
  const dirName = path.dirname(__dirname);
  const reqPath = path.join(dirName, "\\uploads", `\\${req.params.fileName}`);
  //check if file exists. Not a priority for now
  res.download(reqPath);
});

router.get("/test", (req, res) => {
  console.log("pa");
});

module.exports = router;
