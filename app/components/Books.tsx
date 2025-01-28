"use client";
import React from "react";
import { axiosConfig } from "@/axiosConfig";
import { useEffect, useState } from "react";
import { table } from "console";
import Link from "next/link";
import { IBooks } from "@/types";

function Books() {
	const [books, setBooks] = useState<IBooks[] | undefined>([]);

	useEffect(() => {
		getBooks();
	}, []);

	const getBooks = async () => {
		try {
			const { data, status } = await axiosConfig.get("/book");
			setBooks(data);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteBook = async (id: string) => {
		const { status } = await axiosConfig.delete("/book", { data: { id } });
		if (status == 200) {
			getBooks();
		}

		console.log(id, "id from delete book");
	};
	return (
		<div>
			<Link href="/add-book">
				<button className="border border-green-600 bg-gray-400">Add Book</button>
			</Link>
			<table>
				<thead>
					<th>Book Title</th>
					<th>Author</th>
					<th>Genre</th>
					<th>ISBN</th>
				</thead>
				{books?.map((book, index) => {
					return (
						<tr key={index}>
							<td>{book.name}</td>
							<td>{book.author.name + "," + " " + book.author.age}</td>
							<td>{book.genre.name}</td>
							<td>{book.isbn}</td>
							<td>
								<button onClick={() => deleteBook(book.id)}>X</button>
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default Books;

{
	/* <div>
	{books?.map((book, i) => {
		return <div key={i}>{book.name}</div>;
	})}
</div>; */
}
