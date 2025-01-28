export interface IAuthor {
	name: string;
	age: number;
}

export interface IGenre {
	name: string;
}
export interface IBooks {
	id: string;
	name: string;
	authour: string;
	isbn: string;
	author: IAuthor;
	genre: IGenre;
}
