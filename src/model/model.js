import { database } from '../firebase-config';
import { storage } from '../firebase-config';

var db = {};

db.updateUserInfo = (userInfo) => {
    database.ref('users/' + userInfo.uid).update({
        email: userInfo.email,
        photoURL: userInfo.photoURL,
        displayName: userInfo.displayName,
        uid: userInfo.uid
    });
};

db.pushMessege = (msg, conversation, ) => {
    if (msg && msg != '') {

        database.push(
            this.props.conversation,
            {
                content: this.state.content,
                chatTime: new Date(),
            }
        );
    }
};

export default db;