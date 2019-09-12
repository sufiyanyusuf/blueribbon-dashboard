
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Alert} from 'react-bootstrap';
import './styles/index.css'

import NavBar from "./components/navbar";
import { useAuth0 } from "./react-auth0-wrapper";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/profile";

function App() {
  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
