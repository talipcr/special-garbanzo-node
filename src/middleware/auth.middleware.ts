import { Request, Response, NextFunction } from 'express';
import fb from '../config/firebase';

export const validateFirebaseIdToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		(!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer ')) &&
		!(req.cookies && req.cookies.__session)
	) {
		res.status(403).send('Unauthorized');
		return;
	}

	let idToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		// Read the ID Token from the Authorization header.
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else if (req.cookies) {
		// Read the ID Token from cookie.
		idToken = req.cookies.__session;
	} else {
		// No cookie
		res.status(403).send('Unauthorized');
		return;
	}

	try {
		const decodedIdToken = await fb.admin.auth().verifyIdToken(idToken);
		req.user = decodedIdToken;
		next();
		return;
	} catch (error) {
		res.status(403).send('Unauthorized');
		return;
	}
};
