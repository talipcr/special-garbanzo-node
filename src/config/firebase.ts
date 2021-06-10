import config from './config';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

// Connect to Firebase
firebase.default.initializeApp(config.firebase);

// Connect to Firebase Admin
admin.initializeApp(config.firebase);

export default { firebase, admin };
