import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// const MONGO_USERNAME = 'superuser';
// const MONGO_PASSWORD = 'supersecretpassword1';
const MONGO_URL = 'mongodb://127.0.0.1:27017/api';

const MONGO = {
	options: MONGO_OPTIONS,
	url: MONGO_URL,
};

const SERVER_HOSTNAME = 'localhost';
const SERVER_PORT = '27017';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
};

const config = {
	// server: SERVER,
	mongo: MONGO,
};

export default config;
