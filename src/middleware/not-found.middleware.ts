import { Response } from 'express';

export const notFoundHandler = (response: Response): void => {
	const message = 'Resource not found';

	response.status(404).send(message);
};
