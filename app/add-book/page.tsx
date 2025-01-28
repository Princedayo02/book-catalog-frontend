"use client";
import { axiosConfig } from "@/axiosConfig";
import React from "react";
import Form from "react";
import { useState } from "react";
import { IAuthor, IBooks, IGenre } from "@/types";

function AddBook() {
	const [author, setAuthor] = useState<IAuthor[]>([]);

	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [isbn, setIsbn] = useState("");
	const [genre, setGenre] = useState<IGenre[]>([]);
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};

	const addBook = async (name: string, year: string, proofRead: boolean, isbn: string, author: string, genre: string) => {
		const { status } = await axiosConfig.post("/book", { data: name, year, proofRead, isbn, author, genre });
	};

	return (
		<div>
			<form action="">
				<input type="text" placeholder="Name" className="border border-gray-300" onChange={(e) => setName(e.target.value)} />
				<input type="text" placeholder="Year" className="border border-gray-300" onChange={(e) => setYear(e.target.value)} />
				<input
					type="checkbox"
					checked={checked}
					onChange={handleChange}
					placeholder="ProofRead"
					className="border border-gray-300"
				/>
				<input type="text" placeholder="isbn" className="border border-gray-300" onChange={(e) => setIsbn(e.target.value)} />
				{/* <input type="text" placeholder="author" className="border border-gray-300" /> */}
				<select name="Author">
					<option value="Author" key={index}>
						{author.map((authors, index) => {
							authors.name;
						})}
					</option>
				</select>
				<select name="Genre">
					<option value="Genre" key={i}>
						{genre.map((genres, i) => {
							genres.name;
						})}
					</option>
				</select>
				{/* <input type="text" placeholder="genre" className="border border-gray-300" /> */}
				<button className="border border-blue-800" onSubmit={() => addBook}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default AddBook;
