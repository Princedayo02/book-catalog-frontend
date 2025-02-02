import Image from "next/image";
import Books from "./components/Books";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
	return (
		<div>
			<Books />
			<ToastContainer />
		</div>
	);
}
