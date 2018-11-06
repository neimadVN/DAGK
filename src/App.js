import React, { Component } from 'react';
import NavBar from './component/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from "./component/loginpage";
import Routes from './routes/routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes />
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
