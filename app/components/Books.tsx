"use client";
import React from "react";
import { axiosConfig } from "@/axiosConfig";
import { useEffect, useState } from "react";
import { table } from "console";
import Link from "next/link";
import { IBooks } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

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
		const { status, data } = await axiosConfig.delete("/book", { data: { id } });
		if (status == 200) {
			toast.success(data.message);
			getBooks();
		}

		console.log(id, "id from delete book");
	};
	return (
		<div className="flex flex-col gap-10 mt-4 px-14 md:text-base lg:text-lg text-xs">
			<Link href="/add-book" className="flex items-center justify-center ">
				<Button className="bg-blue-600 hover:bg-blue-400">Add Book</Button>
			</Link>
			<table className="overflow-x-scroll w-full">
				<thead>
					<tr>
						<th>Book Title</th>
						<th>Author</th>
						<th>Genre</th>
						<th>ISBN</th>
						<th>ACTION</th>
					</tr>
				</thead>

				<tbody>
					{books?.map((book, index) => {
						return (
							<tr key={index}>
								<td>{book.name}</td>
								<td>{book.author.name + "," + " " + book.author.age}</td>
								<td>{book.genre.name}</td>
								<td>{book.isbn}</td>
								<td className="flex items-center justify-center">
									<Button
										className="flex items-center"
										variant={"destructive"}
										onClick={() => deleteBook(book.id)}>
										{" "}
										DELETE
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
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
