import axios from "axios";
export const axiosConfig = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASURL,
});
console.log(process.env.NEXT_PUBLIC_BASURL);
