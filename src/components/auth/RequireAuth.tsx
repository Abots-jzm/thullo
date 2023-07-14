import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/firebase";
import { authActions } from "../../store/slices/authSlice";
import storage from "../../util/storage";
import { routes } from "../../routes";

function RequireAuth() {
	const user = useAppSelector((state) => state.auth.userId);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(authActions.login(user.uid));
				storage.set("uid", user.uid);
			} else {
				dispatch(authActions.logout());
				storage.remove("uid");
			}
		});
	}, [dispatch]);

	return (
		<>
			{user && <Outlet />}
			{!user && <Navigate to={routes.login} state={{ from: location }} replace />}
		</>
	);
}

export default RequireAuth;
