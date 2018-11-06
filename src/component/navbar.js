import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { provider } from '../firebase-config';
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import db from '../model/model';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            // if (user) {
            //     this.setState({
            //         user: user
            //     });
            // }
        });
    }

    signIn = () => {
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
            // const user = result.user;
            // this.setState({
            //     user: user
            // })
            const user = result.user;
            db.updateUserInfo(user);
        });
    };

    signOut = () => {
        this.props.firebase.auth().signOut().then(() => {
            // this.setState({
            //     user: null
            // });
        });
    }

    getSignButton = () => {
        if (this.props.auth.uid) {
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
        if (!this.props.auth.uid) {
            return (
                null
            )
        } else {
            return (
                <li>
                    <a href='#!' style={{ height: "64px", objectFit: "contain" }}>
                        <img style={avatar} src={this.props.auth.photoURL} />
                        <div style={{ display: "inline", position: "relative" }}>
                            <span style={{ position: "absolute", top: "-49px", width: "100%" }}>{this.props.auth.displayName}</span>
                            <span style={{ visibility: "hidden" }}>{this.props.auth.displayName}</span>
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

//export default NavBar;
export default compose(firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth })))(NavBar);