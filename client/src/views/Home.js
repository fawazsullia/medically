import React from "react";
import * as homeStyle from "./styles/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className={homeStyle.container}>
        <div className={homeStyle.left}>
          <h1>Your patient’s complete medical history in one place</h1>
          <Link to='/register'>
            <button>Get Access</button>
          </Link>
        </div>

        <div className={homeStyle.right}>
          <img src='hero.svg'></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
