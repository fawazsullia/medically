import "./App.css";
import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import RegisterPatient from "./views/RegisterPatient"

function App() {

  const [user, setuser] = useState({ signedIn : true, drName : "Fawaz Sullia", uprn : "123658"  })

  return (
    <div className='App'>
      <Nav user={user} />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

    <Route path='/login'>
        <Login />
    </Route>

    <Route path='/dashboard'>
        <Dashboard user={user} />
    </Route>

    <Route path='/register-patient'>
        <RegisterPatient />
    </Route>

      </Switch>
    </div>
  );
}

export default App;
