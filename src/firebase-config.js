// Firebase App is always required and must be first
import firebase from 'firebase/app';


// Add additional services that you want to use
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/functions';
import 'firebase/storage';

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

var provider = new firebase.auth.GoogleAuthProvider();

var config = {
    apiKey: "AIzaSyCPBKHNV_JhJlsPv0rXE-_Xi9Gagn_skkU",
    authDomain: "chatme-koneko.firebaseapp.com",
    databaseURL: "https://chatme-koneko.firebaseio.com",
    projectId: "chatme-koneko",
    storageBucket: "chatme-koneko.appspot.com",
    messagingSenderId: "734484147466"
  };
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage().ref();

export default firebase;
export {provider, auth, database, storage}