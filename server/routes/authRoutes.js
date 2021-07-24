const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DoctorUser = require("../models/doctorUserSchema")


const saltRounds = 10;

//handle doctor signup
router.post("/signup", async (req, res) => {
  try {
    const { name, affiliated_hospital, uprn, email, password } = req.body;

    


    //hashpassword and store in db
    const hashed_password = await bcrypt.hash(password, saltRounds);
    const new_doctor_user = new DoctorUser ({
      name: name,
      affiliated_hospital: affiliated_hospital,
      uprn: uprn,
      email: email,
      hashed_password: hashed_password,
    });


await res.status(200).send("success");

  } catch (err) {
    console.log(err);
  }
});

//handle doctor login
router.post("/login", (req, res) => {
  res.send("works");
});

module.exports = router;
