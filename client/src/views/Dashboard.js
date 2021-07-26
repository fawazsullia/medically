import React,{useState} from "react";
import AddRecord from "../components/AddRecord";
import Record from "../components/Record";
import * as dashboardStyle from "./styles/dashboard.module.css";

function Dashboard({user}) {

    

const [records, setrecords] = useState([])
const [patientId, setpatientId] = useState("")
const [patientDetails, setpatientDetails] = useState({})
const [loading, setloading] = useState(false)




const searchPatient = () => {
  if(patientId){
setloading(true)
//use this to get all the details related to patient from the server using id provided
fetch('https://medically-app.herokuapp.com/patient/search-patient', {
method : 'POST',
headers : {'Content-Type' : 'application/json'},
mode : 'cors',
body : JSON.stringify({patientId : patientId})

})
.then((res)=> res.json())
.then((response)=> {
setloading(false)
if(response.status){
setpatientDetails(response.patient);
setrecords(response.patient.records);
}
else {  alert(response.message)   }
})
.catch((err)=> {console.log(err); setloading(false);})

}
else { alert("An id is required")   }   }

//handle creating a new record here
const createRecord = (brief, description) => {

    let date = new Date()
    let reqDate = date.getDate()+"/"+(date.getMonth() + 1) +"/"+date.getFullYear()
    reqDate = reqDate.toString()

    
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
    if(patientId ){
      setloading(true)
      setrecords([ { drName : user.drName, uprn : user.uprn, brief : brief, description : description, date: reqDate  } , ...records ])

    fetch('https://medically-app.herokuapp.com/patient/create-record', {
method : 'POST',
headers : {'Content-Type' : 'application/json'},
mode : 'cors',
body : JSON.stringify(data)

})
.then((res)=> res.json())
.then((response)=> {

setloading(false)

})
.catch((err)=> {console.log(err)})}
else {  alert("Search for a patient to create record"); setloading(false);   }
}


  return (
    <div className={dashboardStyle.container}>
      <div className={dashboardStyle.left}>
        <div className={dashboardStyle.searchDiv}>
          <input type='text' placeholder='Enter patient id' onChange={(e)=> setpatientId(e.target.value)} value={patientId} />
          { loading ? (<button type='button' onClick={searchPatient}>
            Searching
          </button>) : (<button type='button' onClick={searchPatient}>
            Search
          </button>) }
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
        <AddRecord createRecord= {createRecord} loading={loading} />
      </div>
    </div>
  );
 
}

export default Dashboard;
