import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {

  return (
    <div className='App'>
      <Nav />

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

      </Switch>
    </div>
  );
}

export default App;
