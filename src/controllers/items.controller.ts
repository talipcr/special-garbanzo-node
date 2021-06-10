// Data Model Interfaces

import { Request, Response } from 'express';
import Item from '../models/item.model';

// Controller Methods

export const findAll = async (
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	Item.find()
		.exec()
		.then((results) => {
			return res.status(200).json({
				items: results,
				count: results.length,
			});
		})
		.catch((e) => {
			res.status(500).send(e.message);
		});
};

export const find = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const ObjectId = req.params.id;

	Item.find({ _id: ObjectId })
		.exec()
		.then((result) => {
			return res.status(200).json({
				item: result,
			});
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
};

export const create = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const IBaseItem = req.body;

	const item = new Item(IBaseItem);

	return item
		.save()
		.then((result) => {
			return res.status(201).json({ item: result });
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
};

export const update = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const ObjectId = req.params.id;

	const IBaseItem = req.body;

	Item.findOneAndReplace({ _id: ObjectId }, IBaseItem)
		.exec()
		.then((result) => {
			return res.status(201).json({ newItem: result });
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
};

export const remove = async (
	req: Request,
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	const ObjectId = req.params.id;

	Item.findByIdAndDelete({ _id: ObjectId })
		.exec()
		.then(() => {
			res.sendStatus(204);
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
};

export const removeAll = async (
	res: Response
): Promise<void | Response<undefined, Record<string, undefined>>> => {
	Item.remove({})
		.exec()
		.then(() => {
			res.sendStatus(204);
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
};
