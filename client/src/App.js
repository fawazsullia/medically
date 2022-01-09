import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import appConfig from "./appConfig";
import Uploads from "./components/Uploads";

const Nav = React.lazy(() => import('./components/Nav'));
const Home = React.lazy(() => import('./views/Home'));
const Register = React.lazy(() => import('./views/Register'));
const Login = React.lazy(() => import('./views/Login'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const RegisterPatient = React.lazy(() => import('./views/RegisterPatient'));

function App() {
  const [user, setuser] = useState({ signedIn: false, drName: "", uprn: "" });
  const [loading, setloading] = useState(true);


  useEffect(() => {
    fetch(`${appConfig.baseUrl}/get-user`, { credentials: 'omit'})
      .then((response) => response.json())
      .then((user) => {
        setuser(user);
        setloading(false);
      })
      .catch((error) => { setloading(false);    })
  }, []);

  const logout = () => {

    fetch(`${appConfig.baseUrl}/auth/logout`, { credentials: appConfig.credentials })
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

          <Route path='/test'>
            <Uploads />
          </Route>

        </Switch>
      </div>
    );
  }
}

export default App;
