import React, { useState } from "react";
import * as registerStyle from "./styles/registerPatient.module.css";
import { Link } from "react-router-dom";
import { validateRegistration } from "../helpers/validateRegistration";

function Register() {
  //local state to send to the server
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("")
  const [phone, setphone] = useState("")

  const handleRegistrationForm = () => {
    const data = {
      name: name,
      email: email,
      affiliated_hospital: affiliatedHospital,
      uprn: uprn,
      password: password,
    };
    const formValid = validateRegistration(data, confirmpass)
    setmessage(formValid.message)

    //fetch and post data to server
    //on data received, redirect to login page
    //on data not received, redirect to register page with an error message
    //implement loader in button for waiting
    
  };

  return (
    <div className={registerStyle.container}>
      <div className={registerStyle.left}>
        <h2>
          Understanding your patients’ medical history lets you help them
          better.
        </h2>
        <p>Register to get access</p>
      </div>

      <div className={registerStyle.right}>
        <form>
          <input
            type='text'
            placeholder='Name'
            onChange={(e) => {
              setname(e.target.value);
            }}
            value={name}
          />{" "}
          <br />
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />{" "}
          <br />
          <input
            type='text'
            placeholder='Affiliated Hospital'
            onChange={(e) => {
              setaffiliatedHospital(e.target.value);
            }}
            value={affiliatedHospital}
          />{" "}
          <br />
          <input
            type='text'
            placeholder='UPRN'
            onChange={(e) => {
              setuprn(e.target.value);
            }}
            value={uprn}
          />{" "}
          <br />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />{" "}
          <br />
          <input type='password' placeholder='Confirm Password' onChange={(e) => {
              setconfirmpass(e.target.value);
            }}
            value={confirmpass} /> <br />
          <button type='button' onClick={handleRegistrationForm}>
            Register
          </button>
          <span style={{color: "red", fontSize: "0.7rem", marginLeft: "20px"}}>{message}</span>
          <p>
            Have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
