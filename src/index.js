import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from './firebase-config';
//import firebase from "firebase";
import { compose } from "redux";
import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import { Provider } from "react-redux";
import rootReducer from "./reducers/reducers";
import thunk from "redux-thunk";

// react-redux-firebase options
const config = {
    userProfile: "users",
    enableLogging: false,
    presence: "presence",
    sessions: "sessions"
};

// Add redux Firebase to compose
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, config))(createStore);
const store = createStoreWithFirebase(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
