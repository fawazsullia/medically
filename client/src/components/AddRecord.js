import React, { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as addRecordStyle from "./styles/addRecord.module.css";
import ReactMarkdown from "react-markdown";

function AddRecord({ createRecord }) {
  const [brief, setbrief] = useState("");
  const [description, setdescription] = useState("");

  //handle change in marldown editor
  function handleEditorChange({ text }) {
    setdescription(text);
  }

  //call function to create a record from parent
  const handleCreateRecord = () => {
    if (brief !== "" && description !== "") {
      createRecord(brief, description);
      setbrief("")
      setdescription("")
    } else {
      alert("Please enter short and long descriptions");
    }
  };

  return (
    <div className={addRecordStyle.container}>
      <h2>Create new record</h2>
      <p>Describe the examination in 2-3 sentences</p>
      <textarea
        placeholder='Brief about the examination'
        onChange={(e) => setbrief(e.target.value)}
        value={brief}
      ></textarea>
      <p>More details</p>

      <MdEditor
        style={{ height: "400px" }}
        view={{ menu: true, md: true, html: false }}
        placeholder='Make it as detailed as possible here! Include prescriptions and any analysis you recommended'
        renderHTML={(text) =>
          React.createElement(ReactMarkdown, {
            source: text,
          })
        }
        onChange={handleEditorChange}
        value={description}
      />
      <button onClick={handleCreateRecord}>Create</button>
    </div>
  );
}

export default AddRecord;
