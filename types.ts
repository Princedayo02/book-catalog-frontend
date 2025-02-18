export interface IAuthor {
	name: string;
	age: number;
	id: string;
}

export interface IGenre {
	name: string;
	id: string;
}
export interface IBooks {
	id: string;
	name: string;
	authour: string;
	isbn: string;
	proofRead: boolean;
	author: IAuthor;
	genre: IGenre;
}
