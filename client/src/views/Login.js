import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as loginStyle from "./styles/login.module.css";
import { validateLogin } from "../helpers/validateLogin";
import appConfig from "../appConfig";
import Toast from "../components/Toast";

function Login({ loginUser}) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);

console.log(message)
  const handleLogin = async () => {
    const data = {
      drEmail: email,
      password: password,
    };

    const isValid = validateLogin(data);
    setmessage(isValid.message);
    //fetch post to server to validate credentials
    if (isValid.status) {
      setloading(true);

      try {
        const res = await fetch(`${appConfig.baseUrl}/auth/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "omit",
          body: JSON.stringify(data),
        });
        const response = await res.json();
        setloading(false);
        if (response.status) {
          loginUser(response.userDetails);
        } else {
          setmessage(response.message);
        }
      } catch (err) {
        setloading(false);
        setmessage("Something went wrong!");

      }
    } else {
      setmessage(isValid.message);

    }
    
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
            type="email"
            placeholder="Email"
            data-testid="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            data-testid="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />{" "}
          <button type="button" data-testid="button" onClick={handleLogin}>
            {loading ? "Logging in...." : "Login"}
          </button>
          <span
            style={{ color: "red", fontSize: "0.7rem", marginLeft: "20px" }}
            data-testid="errormessage"
          >
          </span>
          <p>
            New here? <Link to="/register">Register</Link>
          </p>
        </form>
       { message !== ""  && message !== null && <Toast message={message} type={"warning"} /> }
      </div>
    </div>
  );
}

export default Login;
