import React, {useState} from "react";
import * as uploadStyle from './styles/uploads.module.css'

function Uploads({handleCloseUploads}) {



  const uploadDetails = [
    {
      uploadTitle: "Ranom 1",
      uploadFileName: "randomfilename.png",
      uploadDate: "date",
    },
    {
      uploadTitle: "Ranom 1",
      uploadFileName: "randomfilename.png",
      uploadDate: "date",
    },
    {
      uploadTitle: "Ranom 1",
      uploadFileName: "randomfilename.png",
      uploadDate: "date",
    },
    {
      uploadTitle: "Ranom 1",
      uploadFileName: "randomfilename.png",
      uploadDate: "date",
    },
    {
        uploadTitle: "Some huge ass title, just to see how the card will adjust",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "25 January 2022",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },
      {
        uploadTitle: "X-ray profile of limbs",
        uploadFileName: "randomfilename.png",
        uploadDate: "date",
      },

  ];

  const closeUploads = ()=> {
      handleCloseUploads()
  }



  return <div className={uploadStyle.container} >
<div className={uploadStyle.head} >
    <h2>Click on files to download</h2>
    <p onClick={closeUploads}>X</p>
</div>
<div className={uploadStyle.uploadDiv}>
    {uploadDetails.map((data) => {return <div className={uploadStyle.card}>
        <h5>{data.uploadTitle}</h5>
        <p>{data.uploadDate}</p>
        <h4 className={uploadStyle.download}>download</h4>
    </div>
})}
</div>

  </div>;
}

export default Uploads;
