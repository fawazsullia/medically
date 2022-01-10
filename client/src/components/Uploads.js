import React, {useState, useEffect} from "react";
import * as uploadStyle from './styles/uploads.module.css'
import appConfig from "../appConfig";

function Uploads({handleCloseUploads, patientId}) {

const [uploadDetails, setuploadDetails] = useState([])
   
//need to fetch the data of uploaded files
useEffect(() => {
  fetch(`${appConfig.baseUrl}/file/get-uploads/${patientId}`)
  .then((res)=> res.json())
  .then((response)=> { console.log(response.header)   })
  return () => {
    setuploadDetails([])
  }
}, [])

  
//handle closing the popup
  const closeUploads = ()=> {
      handleCloseUploads()
  }





  return (
  
  
  <div className={uploadStyle.container} >
<div className={uploadStyle.head} >
    <h2>Click on files to download</h2>
    <p onClick={closeUploads}>X</p>
</div>
{ !uploadDetails.length ? <div><p>No uploads yet...</p></div> :
  
  <div className={uploadStyle.uploadDiv}>
    {uploadDetails.map((data) => {return <div className={uploadStyle.card}>
        <h5>{data.uploadTitle}</h5>
        <p>{data.uploadDate}</p>
        <h4 className={uploadStyle.download}>download</h4>
    </div>
})}
</div>}

  </div>)
}

export default Uploads;
