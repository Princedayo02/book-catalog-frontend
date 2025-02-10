"use client";
import { axiosConfig } from "@/axiosConfig";
import React from "react";
import { useState, useEffect } from "react";
import { IAuthor, IGenre } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";

function AddBook() {
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
			const { data } = await axiosConfig.get("/author");
			setAuthor(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const getGenre = async () => {
		try {
			const { data } = await axiosConfig.get("/genre");
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
		<div className="m-10">
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
				<Button className="border border-blue-800" onClick={(e) => addBook(e)} type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default AddBook;
