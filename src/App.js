import React, { Component } from 'react';
import NavBar from './component/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from "./component/loginpage";

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={LoginPage} />
            {/* <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} /> */}
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
