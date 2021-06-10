// Required External Modules and Interfaces

import express from 'express';
// import { checkJwt } from '../middleware/auth.middleware';
import {
	findAll,
	find,
	create,
	update,
	remove,
	removeAll,
} from '../controllers/items.controller';

// Router Definition

export const itemsRouter = express.Router();

// Controller Definitions

itemsRouter.get('/', findAll);

itemsRouter.get('/:id', find);

itemsRouter.post('/', create);

itemsRouter.put('/:id', update);

itemsRouter.delete('/:id', remove);

itemsRouter.delete('/', removeAll);
