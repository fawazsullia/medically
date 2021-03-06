import React from "react";
import * as navStyle from "./styles/nav.module.css";
import {Link} from 'react-router-dom'
import { useLocation } from "react-router";

const linkStyle = {
textDecoration : "none",
color: "inherit",

}



function Nav({user, logout}) {

  let location = useLocation();

  const handleLogout =() => {

logout()

  }
  
  return (
    <div className={navStyle.outerContainer}>
      <div className={navStyle.container}>
        <div className={navStyle.logoDiv}>
          <h2><Link style={linkStyle} to="/">Medically</Link></h2>
        </div>

        <div className={navStyle.navDiv}>
          <ul>
          { <li><a style={linkStyle} href="https://cookie-diagnostic-4cf.notion.site/How-to-use-Medically-App-e373d72957774e928011a14d172a5fdc" target="_blank" >How to use this app</a></li>}
            { !user.signedIn && <li><Link style={linkStyle} to="/login">Login</Link></li>}
            
            {!user.signedIn && <li><Link style={linkStyle} to="/register">Register</Link></li>}
            { ( user.signedIn && location.pathname !== "/dashboard" ) && <li><Link style={linkStyle} to="/dashboard">Dashboard</Link></li>}
            { ( user.signedIn && location.pathname === "/dashboard" ) && <li><Link style={linkStyle} to="/register-patient">Register Patient</Link></li>}
            { ( user.signedIn && location.pathname === "/dashboard" ) && <li><button onClick={handleLogout} className={navStyle.logoutbtn}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
