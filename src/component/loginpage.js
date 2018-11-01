import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    render() {

        return (
            <div>

            </div>
        )
    }
}

const Home = props => {
  return (
    <div>
      <div className="row">
        <div className="input-field col s12">
          <input id="username" type="email" className="validate" />
          <label htmlFor="username">Username</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" />
          <label htmlFor="password">Password</label>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;