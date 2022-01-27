import React, {useEffect, useRef} from 'react';
import * as toastStyle from './styles/toast.module.css'
import '../index.css'


function Toast({message, type="normal"}) {

    const ref = useRef(null);

useEffect(()=>{
    if(message !== "" && message !== undefined){
        ref.current.className = "toast_visible__eVOmt"

    setTimeout(() => {
        ref.current.className = "toast_container__27UEu";

    }, 2500);
    }
    


}, [message])
   
if(message !== ""){
    return <div style={{ backgroundColor : type === "warning" ? "indianred" : "#37a892" }} className={toastStyle.container} ref={ref}>
          {message}
          </div>
}
  
      
}

export default Toast;
