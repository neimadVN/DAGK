import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { provider } from '../firebase-config';
console.log(firebase);

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user
                });
            }
        });
    }

    signIn = () => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({
                user: user
            })
        });
    };

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.setState({
                user: null
            });
        });
    }

    getSignButton = () => {
        if (this.state.user) {
            return (
                <li onClick={this.signOut}><a href='#!'>Sign Out</a></li>
            )
        } else {
            return (
                <li onClick={this.signIn}><a href='#!'>Sign In</a></li>
            )
        }
    }

    getuser = () => {
        if (!this.state.user) {
            return (
                null
            )
        } else {
            return (
                <li>
                    <a href='#!' style={{ height: "64px", objectFit: "contain" }}>
                        <img style={avatar} src={this.state.user.photoURL} />
                        <div style={{ display: "inline", position: "relative" }}>
                            <span style={{ position: "absolute", top: "-49px", width: "100%" }}>{this.state.user.displayName}</span>
                            <span style={{ visibility: "hidden" }}>{this.state.user.displayName}</span>
                        </div>
                    </a>
                </li>
            )
        }
    }

    render() {

        return (
            <div>
                <nav style={backgroundGrad}>
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">Chato</a>
                        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            {this.getSignButton()}
                            {this.getuser()}
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    {this.getuser()}
                    {this.getSignButton()}
                    <li><Link to="/">More</Link></li>
                </ul>
            </div>
        )
    }
}

const backgroundGrad = {
    backgroundColor: "#1fc8db",
    background: "linear-gradient(to right, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)"
}

const avatar = {
    height: "94%",
    width: "auto",
    margin: "2px",
    border: "2px solid white",
    borderRadius: "50%",
    display: "inline",
    overflow: "auto"
}

export default NavBar;