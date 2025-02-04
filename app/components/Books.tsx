"use client";
import React, { Dispatch, SetStateAction } from "react";
import { axiosConfig } from "@/axiosConfig";
import { useEffect, useState } from "react";
import { table } from "console";
import Link from "next/link";
import { toast } from "react-toastify";
import Form from "react";
import { IAuthor, IBooks, IGenre } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

function Books() {
	const [books, setBooks] = useState<IBooks[] | undefined>([]);
	const [modalOpen, setModalOpen] = useState(false);

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
		<div className="flex flex-col gap-10 mt-4 px-14 md:text-base lg:text-lg text-xs border border-green-700">
			<div className="flex items-center justify-center ">
				<Button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-400">
					Add Book
				</Button>
			</div>
			<table className=" w-[300px] border border-red-600">
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
			{modalOpen ? <AddBookModal setModalOpen={setModalOpen} /> : null}
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

interface IModal {
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddBookModal = ({ setModalOpen }: IModal) => {
	const [author, setAuthor] = useState<IAuthor[]>([]);
	const [authorId, setAuthorId] = useState("");
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [isbn, setIsbn] = useState("");
	const [genre, setGenre] = useState<IGenre[]>([]);
	const [genreId, setGenreId] = useState("");
	const [proofRead, setProofRead] = useState(false);

	useEffect(() => {
		getAuthor();
		getGenre();
	}, []);

	const checkProofRead = () => {
		setProofRead(!proofRead);
	};
	console.log(genreId, "genre id");

	const getAuthor = async () => {
		try {
			const { data, status } = await axiosConfig.get("/author");
			setAuthor(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const getGenre = async () => {
		try {
			const { data, status } = await axiosConfig.get("/genre");
			setGenre(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const addBook = async (e: React.FormEvent) => {
		e.preventDefault();

		const { status, data } = await axiosConfig.post("/book", { name, year, proofRead, isbn, authorId, genreId });
		console.log(status);
		if (status == 201) {
			toast.success(data.message);
			setName("");
			setProofRead(false);
			setIsbn("");
			setYear("");
		} else {
			toast.error("Error creating book");
		}
	};
	return (
		<div className="absolute inset-0 bg-black bg-opacity-70">
			<button onClick={() => setModalOpen(false)} className="flex items-center justify-end ml-auto text-white p-8">
				X
			</button>
			<div className="m-10 bg-white opacity-100 z-40">
				<h1 className="text-3xl text-center bold-lg py-8 font-bold">ADD BOOK TO THE LIBRARY</h1>
				<form
					action=""
					className="flex flex-col w-full gap-5 px-8 items-center justify-items-center align-middle md:w-[600px] justify-center mx-auto lg:w-[600px]">
					<Input
						value={name}
						type="text"
						placeholder="Name"
						className="border border-gray-300"
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						value={year}
						type="text"
						placeholder="Year"
						className="border border-gray-300"
						onChange={(e) => setYear(e.target.value)}
					/>

					<Input
						value={isbn}
						type="text"
						placeholder="Isbn"
						className="border border-gray-300"
						onChange={(e) => setIsbn(e.target.value)}
					/>
					{/* <input  type="text" placeholder="author" className="border border-gray-300" /> */}

					<Select onValueChange={(value: string) => setAuthorId(value)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Author" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{author.map((authors, index) => {
									return (
										<SelectItem
											className=" focus:bg-blue-500 focus:text-white"
											value={authors.id}
											key={index}>
											{authors.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select onValueChange={(value: string) => setGenreId(value)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Genre" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{genre.map((genres, i) => {
									return (
										<SelectItem
											className=" focus:bg-blue-500 focus:text-white"
											value={genres.id}
											key={i}>
											{genres.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>

					{/* <select name="Genre" onChange={(e) => setGenreId(e.target.value)}>
					<option value="" disabled>
						Select Genre
					</option>
					{genre.map((genres, i) => {
						return (
							<option value={genres.id} key={i}>
								{genres.name}
							</option>
						);
					})}
				</select> */}
					{/* <input type="text" placeholder="genre" className="border border-gray-300" /> */}
					<div className="flex flex-row gap-2 w-full">
						<label htmlFor="ProofRead" className="id">
							ProofRead?
						</label>
						<Checkbox
							checked={proofRead}
							className="border border-gray-300"
							id="ProofRead"
							onCheckedChange={checkProofRead}
						/>
					</div>
					<Button className="border border-blue-800 mb-4" onClick={(e) => addBook(e)} type="submit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};
