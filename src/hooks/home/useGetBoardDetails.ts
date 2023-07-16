import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../data";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { apiRoutes } from "../../api/routes";
import { Board } from "./types";

async function getBoardDetails(bordId?: string) {
	if (!bordId) throw new Error("Something went wrong!");

	return (await getDoc(doc(db, apiRoutes.boards, bordId))).data() as Board;
}

function useGetBoardDetails(boardId?: string) {
	return useQuery({
		queryKey: [QueryKeys.boardDetails, boardId],
		queryFn: () => getBoardDetails(boardId),
		enabled: !!boardId,
	});
}

export default useGetBoardDetails;
