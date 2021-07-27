import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import RegisterPatient from "./views/RegisterPatient";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [user, setuser] = useState({ signedIn: false, drName: "", uprn: "" });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("https://medically-app.herokuapp.com/get-user", { credentials: "include" })
      .then((response) => response.json())
      .then((user) => {
        setuser(user);
        setloading(false);
      })
      .catch((error) => { setloading(false);    })
  }, []);

  const logout = () => {

    fetch(`https://medically-app.herokuapp.com/auth/logout`, { credentials: "include" })
    .then((response) =>  {setuser({ signedIn: false, drName: "", uprn: "" } ); })
    .catch((err) => { alert("Error Signing out")})
  }

  const loginUser = (userDetails) => {
    setuser(userDetails);
  };

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className='App'>
        <Nav user={user} logout={logout} />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/register'>
            {user.signedIn ? <Redirect to='/dashboard' /> : <Register />}
          </Route>

          <Route path='/login'>
            {user.signedIn ? (
              <Redirect to='/dashboard' />
            ) : (
              <Login loginUser={loginUser} user={user} />
            )}
          </Route>

          <Route path='/dashboard'>
            {user.signedIn ? (
              <Dashboard user={user} />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>

          <Route path='/register-patient'>
            <RegisterPatient user={user} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
