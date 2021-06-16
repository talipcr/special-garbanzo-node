// Imports & Models

import { Request, Response } from 'express';
import fb from '../config/firebase';

const auth = fb.firebase.default.auth();

// Controller Methods

export const signup = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const { email, password } = req.body;
	let validate = false;

	if (email !== null && password !== null) {
		if (validateEmail(email)) {
			validate = true;
		}
	}

	if (validate) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const user = userCredential;
				console.log(userCredential);
				user.user?.sendEmailVerification();
				return res.status(200).json({
					user: user,
				});
			})
			.catch((e) => {
				res.status(500).send(e.message);
			});
	} else {
		return res.status(500).send('Permission denied');
	}
};

export const login = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const { email, password } = req.body;
	let validate = false;

	if (email !== null && password !== null) {
		if (validateEmail(email)) {
			validate = true;
		}
	}

	if (validate) {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const user = userCredential;
				console.log(user);
				if (!user.user?.emailVerified) {
					user.user?.sendEmailVerification();
				}
				return res.status(200).json({
					user: user,
				});
			})
			.catch((e) => {
				res.status(500).send(e.message);
			});
	} else {
		return res.status(500).send('Permission denied');
	}
};

export const logout = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	return auth
		.signOut()
		.then(() => {
			res.status(200).send('Signed Out');
		})
		.catch((e) => {
			res.status(500).send(e.message);
		});
};

export const reset = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const { email } = req.body;
	let validate = false;

	if (email !== null) {
		if (validateEmail(email)) {
			validate = true;
		}
	}

	if (validate) {
		return auth
			.sendPasswordResetEmail(email)
			.then((userCredential) => {
				const user = userCredential;
				console.log(user);

				return res.status(200).json({
					user: user,
				});
			})
			.catch((e) => {
				res.status(500).send(e.message);
			});
	} else {
		return res.status(500).send('Permission denied');
	}
};

function validateEmail(email: string) {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}
