import Books from "./components/Books";
import { ToastContainer } from "react-toastify";

export default function Home() {
	return (
		<div>
			<Books />
			<ToastContainer />
		</div>
	);
}
