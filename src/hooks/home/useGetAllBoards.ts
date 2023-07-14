import { UserProfile } from "./../profile/types";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../data";
import { collection, getDocs, or, orderBy, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { Board } from "./types";
import { apiRoutes } from "../../api/routes";
import useGetUserProfile from "../profile/useGetUserProfile";

async function getAllBoards(user?: UserProfile) {
	const boardsRef = collection(db, apiRoutes.boards);
	const userBoardsQuery = query(
		boardsRef,
		or(where("isPrivate", "==", false), where("admin", "==", user), where("members", "array-contains", user)),
		orderBy("createdAt", "asc")
	);

	return (await getDocs(userBoardsQuery)).docs.map((doc) => doc.data()) as Board[];
}

function useGetAllBoards() {
	const { data: userProfile } = useGetUserProfile();

	return useQuery({
		queryKey: [QueryKeys.allBoards],
		queryFn: () => getAllBoards(userProfile),
		enabled: !!userProfile,
	});
}

export default useGetAllBoards;
