const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DoctorUser = require("../models/doctorUserSchema");
const serverConfig = require('../serverConfig')

const saltRounds = 10;

//handle doctor signup
router.post("/register", async (req, res) => {
  try {
    const { drName, affiliated_hospital, uprn, drEmail, password } = req.body;

    const docExists = await DoctorUser.find({ uprn: uprn });

    if (docExists.length < 1) {
      //hashpassword and store in db
      const hashed_password = await bcrypt.hash(password, saltRounds);

      const new_doctor_user = new DoctorUser({
        drName: drName,
        affiliated_hospital: affiliated_hospital,
        uprn: uprn,
        drEmail: drEmail,
        hashed_password: hashed_password,
      });

      await new_doctor_user.save();
      await res
        .status(200)
        .json({ status: true, message: "Account successfully created" })
        .end();
    } else {
      await res.json({ status: false, message: "Doctor already exists" }).end();
    }
  } catch (err) {
    await res.json({ status: false, message: "Error" }).end();
  }
});

//handle doctor login
router.post("/login", async (req, res) => {
  const { drEmail, password } = req.body;

  const userExists = await DoctorUser.find({ drEmail: drEmail });

  if (userExists.length > 0) {
    const match = await bcrypt.compare(password, userExists[0].hashed_password);
    if (match) {
      if(serverConfig.environment === "production"){
        req.session.drName = userExists[0].drName;
        req.session.uprn = userExists[0].uprn;
      }
     
      await res
        .status(200)
        .json({
          status: true,
          message: "Success",
          userDetails: {
            signedIn: true,
            drName: userExists[0].drName,
            uprn: userExists[0].uprn,
          },
        }).end();
    } else {
      await res
        .status(404)
        .json({ status: false, message: "Email or Password incorrect" })
        .end();
    }
  } else {
    await res
      .status(404)
      .json({ status: false, message: "User does not exist. Please register" })
      .end();
  }
});

router.get("/auth/logout", async (req, res) => { 

req.session.destroy();
res.end();


})

module.exports = router;
