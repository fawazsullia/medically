import React, { useState, useEffect } from "react";
import * as uploadStyle from "./styles/uploads.module.css";
import appConfig from "../appConfig";
import {nanoid} from 'nanoid'

function Uploads({ handleCloseUploads, patientId }) {
  const [uploadDetails, setuploadDetails] = useState([]);

  //need to fetch the data of uploaded files
  useEffect(() => {
    fetch(`${appConfig.baseUrl}/file/get-uploads/${patientId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.uploads.length !== 0) {
          setuploadDetails(response.uploads);
        } else {
          setuploadDetails([]);
        }
      })
      .catch((e) => console.log(e));
  }, [patientId]);

  //handle closing the popup
  const closeUploads = () => {
    handleCloseUploads();
  };

  //download the file when clicked on placeholder
  const handleDownloads = (e) => {
    const randomName = nanoid(8)
    let downloadUrl =
      e.target.nodeName === "DIV" ? e.target.id : e.target.parentNode.id;
    fetch(downloadUrl)
      .then((res) => res.blob())
      .then((response) => {
        console.log(response);
        let url = window.URL.createObjectURL(response);
        let anchor = document.createElement("a");
        anchor.href = url;
        //figure out a way to make the download file name the title of the file
        anchor.download = `${randomName}`;
        anchor.click();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={uploadStyle.container}>
      <div className={uploadStyle.head}>
        <h2>Click on files to download</h2>
        <p onClick={closeUploads}>X</p>
      </div>
      {uploadDetails.length === 0 ? (
        <div>
          <p>No uploads yet...</p>
        </div>
      ) : (
        <div className={uploadStyle.uploadDiv}>
          {uploadDetails.map((data) => {
            return (
              <div
                onClick={handleDownloads}
                className={uploadStyle.card}
                id={data.downloadUrl}
                key={data.downloadUrl}
              >
                <h5>{data.uploadTitle}</h5>
                <p>{data.uploadDate}</p>
                <h4 className={uploadStyle.download}>download</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Uploads;
