import HttpException from '../common/http-exception';
import { Response } from 'express';

export const errorHandler = (
	error: HttpException,
	response: Response
): void => {
	const status = error.statusCode || error.status || 500;

	response.status(status).send(error);
};
