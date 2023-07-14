import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { UserProfile } from "./types";
import { QueryKeys } from "../data";
import { useAppSelector } from "../../store/hooks";
import useLogout from "../auth/useLogout";
import { apiRoutes } from "../../api/routes";

async function getUserProfile(userId: string | null) {
	if (!userId) throw new Error("Something went wrong");

	return (await getDoc(doc(db, apiRoutes.users, userId))).data() as UserProfile;
}

function useGetUserProfile() {
	const userId = useAppSelector((state) => state.auth.userId);
	const { mutate: logout } = useLogout();

	if (!userId) {
		logout();
	}

	return useQuery({
		queryKey: [QueryKeys.profile],
		queryFn: () => getUserProfile(userId),
	});
}

export default useGetUserProfile;
