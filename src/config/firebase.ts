import config from './config';
import * as firebase from 'firebase';

// Connect to Firebase
firebase.default.initializeApp(config.firebase);

export default firebase;
