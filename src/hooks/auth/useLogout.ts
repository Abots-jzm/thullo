import { useAppDispatch } from "./../../store/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { authActions } from "../../store/slices/authSlice";

async function Logout() {
	return await signOut(auth);
}

function useLogout() {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: Logout,
		onSuccess: () => {
			dispatch(authActions.logout());
			queryClient.clear();
		},
	});
}

export default useLogout;
