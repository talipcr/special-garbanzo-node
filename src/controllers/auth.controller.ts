// Imports & Models

import { Request, Response } from 'express';
import fb from '../config/firebase';

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
		return fb.firebase.default
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const user = userCredential;
				console.log(userCredential);

				return res.status(200).json({
					user: user,
				});
			})
			.catch((e) => {
				res.status(500).send(e.message);
			});
	} else {
		return res.status(500).json({ validate: false });
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
		return fb.firebase.default
			.auth()
			.signInWithEmailAndPassword(email, password)
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
		return res.status(500).json({ validate: false });
	}
};

export const logout = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	return fb.firebase.default
		.auth()
		.signOut()
		.then(() => {
			res.status(200).send('Signed Out');
		})
		.catch((e) => {
			res.status(500).send(e.message);
		});
};

function validateEmail(email: string) {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}
