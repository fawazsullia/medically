import React from "react";
import * as navStyle from "./styles/nav.module.css";
import {Link} from 'react-router-dom'

const linkStyle = {
textDecoration : "none",
color: "inherit",

}

function Nav() {
  return (
    <div className={navStyle.outerContainer}>
      <div className={navStyle.container}>
        <div className={navStyle.logoDiv}>
          <h2><Link style={linkStyle} to="/">Medically</Link></h2>
        </div>

        <div className={navStyle.navDiv}>
          <ul>
            <li><Link style={linkStyle} to="/login">Login</Link></li>
            <li><Link style={linkStyle} to="/register">Register</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
