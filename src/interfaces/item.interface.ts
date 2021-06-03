export interface IBaseItem {
	name: string;
	price: number;
	description: string;
	image: string;
}

export interface Item extends IBaseItem {
	id: number;
}
