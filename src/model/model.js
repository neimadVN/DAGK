import { database } from '../firebase-config';

var db = {};

db.updateUserInfo = (userInfo) => {
    database.ref('users/' + userInfo.uid).update({
        email: userInfo.email,
        photoURL: userInfo.photoURL,
        displayName: userInfo.displayName,
        uid: userInfo.uid
    });
}

export default db;