import React from "react";
import * as spinnerStyle from './styles/spinner.module.css'

function LoadingSpinner() {
  return (
    
         <div className={spinnerStyle.ring}>
  <span></span>
</div>
    
  );
}

export default LoadingSpinner;
