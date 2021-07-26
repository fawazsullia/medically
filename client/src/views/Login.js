import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as loginStyle from "./styles/login.module.css";
import { validateLogin } from "../helpers/validateLogin";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const handleLogin = (event) => {
    const data = {
      drEmail: email,
      password: password,
    };

    const isValid = validateLogin(data);
    setmessage(isValid.message);

//fetch post to server to validate credentials
//if valid user, redirect to dash
//if no account, redirect to signup
//if valid user but wrong password, error

  };

  return (
    <div className={loginStyle.container}>
      <div className={loginStyle.left}>
        <h2>
          Understanding your patients’ medical history lets you help them
          better.
        </h2>
        <p>Login to get access</p>
      </div>

      <div className={loginStyle.right}>
        <form>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />{" "}
          <br />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />{" "}
          <button type='button' onClick={handleLogin}>
            Login
          </button>
          <span
            style={{ color: "red", fontSize: "0.7rem", marginLeft: "20px" }}
          >
            {message}
          </span>
          <p>
            New here? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
