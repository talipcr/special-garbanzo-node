import * as mongoose from 'mongoose';
import { Item } from '../interfaces/item.interface';

const itemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<Item>('Item', itemSchema);
