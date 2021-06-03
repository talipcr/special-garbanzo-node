// Required External Modules and Interfaces

import express, { Request, Response } from 'express';
import Item from '../models/item.model';
import { checkJwt } from '../middleware/auth.middleware';
import { Mongoose, ObjectId } from 'mongoose';

// Router Definition

export const itemsRouter = express.Router();

// Controller Definitions

itemsRouter.get('/', async (req: Request, res: Response) => {
	// try {
	// 	const items: Item[] = await ItemService.findAll();
	// 	res.status(200).send(items);
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }

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
});

itemsRouter.get('/:id', async (req: Request, res: Response) => {
	let ObjectId = req.params.id;

	// try {
	// 	const item: Item = await ItemService.find(id);
	// 	if (item) {
	// 		res.status(200).send(item);
	// 	}
	// 	res.status(400).send('item not found');
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }

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
});

itemsRouter.post('/', async (req: Request, res: Response) => {
	// try {
	// 	const item: IBaseItem = req.body;
	// 	const newItem = await ItemService.create(item);
	// 	res.status(201).json(newItem);
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }

	let IBaseItem = req.body;

	const item = new Item(IBaseItem);

	return item
		.save()
		.then((result) => {
			return res.status(201).json({ item: result });
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
});

itemsRouter.put('/:id', async (req: Request, res: Response) => {
	// const id: number = parseInt(req.params.id, 10);
	// try {
	// 	const itemUpdate: Item = req.body;
	// 	const existingItem: Item = await ItemService.find(id);
	// 	if (existingItem) {
	// 		const updateItem = await ItemService.update(id, itemUpdate);
	// 		return res.status(200).json(updateItem);
	// 	}
	// 	const newItem = await ItemService.create(itemUpdate);
	// 	res.status(201).json(newItem);
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }

	let ObjectId = req.params.id;

	let IBaseItem = req.body;

	Item.findOneAndReplace({ _id: ObjectId }, IBaseItem)
		.exec()
		.then((result) => {
			return res.status(201).json({ newItem: result });
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
});

itemsRouter.delete('/:id', async (req: Request, res: Response) => {
	let ObjectId = req.params.id;

	// try {
	// 	const id: number = parseInt(req.params.id, 10);
	// 	await ItemService.remove(id);
	// 	res.sendStatus(204);
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }

	Item.findByIdAndDelete({ _id: ObjectId })
		.exec()
		.then(() => {
			res.sendStatus(204);
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
});
