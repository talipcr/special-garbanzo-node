import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const MONGO_URL = 'mongodb://127.0.0.1:27017/api';

const MONGO = {
	options: MONGO_OPTIONS,
	url: MONGO_URL,
};

// const SERVER_HOSTNAME = 'localhost';
// const SERVER_PORT = '27017';

// const SERVER = {
// 	hostname: SERVER_HOSTNAME,
// 	port: SERVER_PORT,
// };

const FIREBASE_CONFIG = {
	apiKey: 'AIzaSyDTUZdvdI-RIgzOD2N5858mbqbnhuJhgow',
	authDomain: 'special-garbanzo.firebaseapp.com',
	projectId: 'special-garbanzo',
	storageBucket: 'special-garbanzo.appspot.com',
	messagingSenderId: '1013782679291',
	appId: '1:1013782679291:web:04842a4c2f330b5cd6aa5e',
};

const config = {
	mongo: MONGO,
	firebase: FIREBASE_CONFIG,
};

export default config;
