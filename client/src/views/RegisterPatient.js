import React, { useState } from "react";
import * as registerStyle from "./styles/registerPatient.module.css";
import { Link } from "react-router-dom";
import { validatePatientRegistration } from "../helpers/validatepatientRegistration";

function RegisterPatient({user}) {
  //local state to send to the server
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("")
  const [bloodGroup, setbloodGroup] = useState("")
  const [message, setmessage] = useState("")
  const [loading, setloading] = useState(false)


  const handleRegistrationForm = () => {
    const data = {
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      bloodGroup: bloodGroup,
      uprn : user.uprn,
     
    };
    //validate the data
const formValid = validatePatientRegistration(data)
setmessage(formValid.message)

if(formValid.status){
setloading(true)
fetch('https://medically-app.herokuapp.com/patient/register-patient',{

method: 'POST',
headers: { 'Content-Type' : 'application/json'  },
mode : 'cors',
body : JSON.stringify(data)
})
.then((res)=> res.json())
.then((response)=>{  
setloading(false)
  //if success, I want the id and a message called user created
  //if not, error message
if(response.status){   

  setmessage(response.message)
  //I awnt to do something to display the id created for the patient

}
else {  setmessage(response.message)   }

})
.catch( (error) => {setmessage("Something went wrong"); setloading(false);})

}
else {  return }
    //fetch and post data to server
    //receive the created patientId
    //on data not received, redirect to register page with an error message
    //implement loader in button for waiting
    
  };

  return (
    <div className={registerStyle.container}>
      <div className={registerStyle.left}>
        <h2>
        Patient doesn’t<br/> have an id and wants to create one?
        </h2>
        <p>Create one here!</p>
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
            placeholder='Phone'
            onChange={(e) => {
              setphone(e.target.value);
            }}
            value={phone}
          />{" "}
          <br />
          <input
            type='text'
            placeholder='Blood Group'
            onChange={(e) => {
              setbloodGroup(e.target.value);
            }}
            value={bloodGroup}
          />{" "}
          <br />
          
          { loading ? (<button type='button' onClick={handleRegistrationForm}>
Registering          </button>) : (<button type='button' onClick={handleRegistrationForm}>
            Register
          </button>) }
          <span style={{color: "red", fontSize: "0.7rem", marginLeft: "20px"}}>{message}</span>
         
        </form>
      </div>
    </div>
  );
}

export default RegisterPatient;
