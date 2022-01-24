import React, { useState } from "react";
import AddRecord from "../components/AddRecord";
import Record from "../components/Record";
import * as dashboardStyle from "./styles/dashboard.module.css";
import appConfig from "../appConfig";
import Uploads from "../components/Uploads";

function Dashboard({ user }) {
  const [records, setrecords] = useState([]);
  const [patientId, setpatientId] = useState("");
  const [patientDetails, setpatientDetails] = useState({});
  const [loading, setloading] = useState(false);
  const [file, setfile] = useState();
  const [uploadTitle, setuploadTitle] = useState("");
  const [uploadsVisible, setuploadsVisible] = useState(false);
  const [uploading, setuploading] = useState(false);

  //* search patient based on an id to retrieve the records
  const searchPatient = () => {
    if (patientId) {
      setloading(true);
      //use this to get all the details related to patient from the server using id provided

      fetch(`${appConfig.baseUrl}/patient/search-patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ patientId: patientId }),
      })
        .then((res) => res.json())
        .then((response) => {
          setloading(false);
          if (response.status) {
            setpatientDetails(response.patient);
            setrecords(response.patient.records);
          } else {
            alert(response.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      alert("An id is required");
    }
  };

  //* handle creating a new record here
  const createRecord = (brief, description) => {
    let date = new Date();
    let reqDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    reqDate = reqDate.toString();

    const data = {
      drName: user.drName,
      uprn: user.uprn,
      brief: brief,
      description: description,
      date: reqDate,
      patientId: patientId,
    };

    if (patientId) {
      setloading(true);
      setrecords([
        {
          drName: user.drName,
          uprn: user.uprn,
          brief: brief,
          description: description,
          date: reqDate,
        },
        ...records,
      ]);

      fetch(`${appConfig.baseUrl}/patient/create-record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Search for a patient to create record");
      setloading(false);
    }
  };

  //* upload file in chunks and also send data about the upload to save in database
  const handleFileUpload = async () => {
    if (patientId && uploadTitle) {
      if (file.size > 52428800000) {
        alert("File size too large. 5mb max");
      } else {
        setuploading(true);
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "e5ynfkku");
          let response = await fetch(
            `https://api.cloudinary.com/v1_1/indiagoesremote/image/upload`,
            {
              method: "post",
              body: formData,
            }
          );

          const res = await response.json();

          //send the file name and title to store in database
          const toSend = {
            patientId: patientId,
            downloadUrl: res.secure_url,
            uploadTitle: uploadTitle,
          };

          await fetch(`${appConfig.baseUrl}/file/data`, {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(toSend),
          });

          setuploading(false);
          setuploadTitle("");
        } catch (err) {
          setuploading(false);
        }
      }
    } else {
      alert(" A patient id and title is required to upload a file");
    }
  };

  //open the uploads tab with this
  const openUploads = () => {
    if (patientId.length) {
      setuploadsVisible(true);
    } else {
      alert("Please search for a patient");
    }
  };

  const handleCloseUploads = () => {
    setuploadsVisible(false);
  };

  return uploadsVisible ? (
    <Uploads handleCloseUploads={handleCloseUploads} patientId={patientId} />
  ) : (
    <div className={dashboardStyle.container}>
      <div className={dashboardStyle.left}>
        <div className={dashboardStyle.searchDiv}>
          <input
            type="text"
            placeholder="Enter patient id"
            onChange={(e) => setpatientId(e.target.value)}
            value={patientId}
          />
          {loading ? (
            <button type="button" onClick={searchPatient}>
              Searching
            </button>
          ) : (
            <button type="button" onClick={searchPatient}>
              Search
            </button>
          )}
        </div>
        <div className={dashboardStyle.patientDetailsDiv}>
          <span>
            Name:{" "}
            <span style={{ color: "#37A892" }}>
              {patientDetails.patientName}
            </span>
          </span>
          <span>
            Blood Group:{" "}
            <span style={{ color: "#37A892" }}>
              {patientDetails.bloodGroup}
            </span>
          </span>
          <button className={dashboardStyle.showUploads} onClick={openUploads}>
            Uploads
          </button>
        </div>
        <div className={dashboardStyle.patientRecordDiv}>
          {!records.length && (
            <figure>
              <img src="loading.svg" alt="Nothing found waiting image"></img>
              <figcaption style={{ fontSize: "0.7rem", textAlign: "center" }}>
                Nothing here. Try searching
              </figcaption>
            </figure>
          )}
          {records.map((record) => {
            return <Record record={record} key={record.brief} />;
          })}
        </div>
      </div>

      <div className={dashboardStyle.right}>
        <div className={dashboardStyle.uploadTitleDiv}>
          <h4>Upload File:</h4>
          <input
            placeholder="What's the upload about?"
            type="text"
            value={uploadTitle}
            onChange={(e) => {
              setuploadTitle(e.target.value);
            }}
          ></input>
        </div>

        <div className={dashboardStyle.uploadDiv}>
          <input
            type="file"
            className={dashboardStyle.in}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <button className={dashboardStyle.upload} onClick={handleFileUpload}>
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        <AddRecord createRecord={createRecord} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;
