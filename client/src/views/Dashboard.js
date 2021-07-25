import React,{useState} from "react";
import AddRecord from "../components/AddRecord";
import Record from "../components/Record";
import * as dashboardStyle from "./styles/dashboard.module.css";
import { Redirect } from "react-router";
import { recordss } from "../records";

function Dashboard({user}) {

    

const [records, setrecords] = useState([])
const [patientId, setpatientId] = useState("")
const [patientDetails, setpatientDetails] = useState({ patientName : "Vivek" , bloodGroup : "O+"})

const searchPatient = () => {

//use this to get all the details related to patient from the server using id provided


}

//handle creating a new record here
const createRecord = (brief, description) => {

    let date = new Date()
    let reqDate = date.getDate()+"/"+(date.getMonth() + 1) +"/"+date.getFullYear()
    reqDate = reqDate.toString()

    setrecords([ { drName : user.drName, uprn : user.uprn, brief : brief, description : description, date: reqDate  } , ...records ])
    
    const data = {
        drName : user.drName,
        uprn : user.uprn,
        brief: brief,
        description : description,
        date: reqDate,
        patientId : patientId
    }

    //send this to the server
    //search patient using patientId
    //push this data to the array called records or history
}



if(user.signedIn){

  return (
    <div className={dashboardStyle.container}>
      <div className={dashboardStyle.left}>
        <div className={dashboardStyle.searchDiv}>
          <input type='text' placeholder='Enter patient id' onChange={(e)=> setpatientId(e.target.value)} value={patientId} />
          <button type='button' onClick={searchPatient}>Search</button>
        </div>
        <div className={dashboardStyle.patientDetailsDiv}>
        <span>Name: <span style={{color: "#37A892"}}>{patientDetails.patientName}</span></span>
        <span>Blood Group: <span style={{color: "#37A892"}}>{patientDetails.bloodGroup}</span></span>


        </div>
        <div className={dashboardStyle.patientRecordDiv}>
         { !records.length && <figure>
            <img src='loading.svg' alt='Nothing found waiting image'></img>
            <figcaption style={{ fontSize: "0.7rem", textAlign: "center" }}>
              Nothing here. Try searching
            </figcaption>
          </figure> }
         { records.map((record)=> { return <Record record={record} /> })}
        </div>
      </div>

      <div className={dashboardStyle.right}>
        <AddRecord createRecord= {createRecord} />
      </div>
    </div>
  );}
  else {
    return(<Redirect to="/login" />)
  }
}

export default Dashboard;
