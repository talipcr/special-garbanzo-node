// Required External Modules

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/config';
import { itemsRouter } from './routers/items.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

dotenv.config();

// App Variables
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// Connect to Mongo
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((error) => {
		console.log(error.message, error);
	});

// Log the request
app.use((req, res, next) => {
	console.log(
		`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.status}]`
	);

	next();
});

// App Configuration
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRouter);

// App use middlewares
app.use(errorHandler);
app.use(notFoundHandler);

// Server Activation
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
