import React, { useState } from "react";
import * as registerStyle from "./styles/register.module.css";
import { Link, Redirect } from "react-router-dom";
import { validateRegistration } from "../helpers/validateRegistration";

function Register() {
  //local state to send to the server
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [affiliatedHospital, setaffiliatedHospital] = useState("");
  const [uprn, setuprn] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("")
  const [message, setmessage] = useState("")
  const [loading, setloading] = useState(false)

  const handleRegistrationForm = () => {
    const data = {
      drName: name,
      drEmail: email,
      affiliated_hospital: affiliatedHospital,
      uprn: uprn,
      password: password,
    };
    const formValid = validateRegistration(data, confirmpass)
    setmessage(formValid.message)
if(formValid.status){
  setloading(true)
    //fetch and post data to server
    fetch('https://medically-app.herokuapp.com/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)

    })
    .then((res)=> res.json() )
  .then( (response) => { 
    setloading(false)
    if(response.status){
      setmessage(response.message);
      window.location = "https://medically.netlify.app/login";
    }
    else {  setmessage(response.message);  }

   }) 
   .catch((err)=>{console.log(err); setloading(false); setmessage("Something went wrong. Please try again.");})
  }
    else {  return  }
   
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
          
          { loading ? (<button type='button' onClick={handleRegistrationForm}>
            Registering...
          </button>) : (<button type='button' onClick={handleRegistrationForm}>
            Register
          </button>) }
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
