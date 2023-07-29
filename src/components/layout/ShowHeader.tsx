import { Outlet } from "react-router-dom";
import Header from "./Header";

function ShowHeader() {
	return (
		<div className="flex h-screen flex-col">
			<Header />
			<Outlet />
		</div>
	);
}

export default ShowHeader;
