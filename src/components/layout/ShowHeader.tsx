import { Outlet } from "react-router-dom";
import Header from "./Header";

function ShowHeader() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default ShowHeader;
