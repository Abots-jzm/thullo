import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={routes.home} replace />} />
			<Route path={routes.signup} element={<Signup />} />
			<Route path={routes.login} element={<Login />} />
			<Route element={<RequireAuth />}>
				<Route path={routes.home} element={<Home />} />
				<Route path={routes.profile} element={<Profile />} />
			</Route>
		</Routes>
	);
}

export default App;
