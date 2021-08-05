import React, {useState} from 'react'
import * as recordStyle from './styles/record.module.css'
import ReactMarkdown from 'react-markdown'

function Record({record}) {


 const [show, setshow] = useState(false)

 const showDetails = () => {

show ? setshow(false) : setshow(true)

 }

 

 const result = <ReactMarkdown>{record.description}</ReactMarkdown>
 

    return (
        <div className={recordStyle.container} onClick={showDetails}>
        <div className={recordStyle.headline}>
        <span>Dr. {record.drName}</span>    
        <span>{record.created_date}</span>
        </div>
        <p>{record.brief}</p>
        <div style={{ height : show ? "auto" : "0px", display: show ? "block" : "none"   }} className={recordStyle.dropDown} >
        {result}
        </div>
        </div>
    )
}

export default Record
