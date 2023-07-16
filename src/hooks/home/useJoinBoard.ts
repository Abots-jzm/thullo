import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { apiRoutes } from "../../api/routes";
import { JoinBoardPayload } from "./types";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";

async function joinBoard({ boardId, user }: JoinBoardPayload) {
	return await updateDoc(doc(db, apiRoutes.boards, boardId), {
		members: arrayUnion(user),
	});
}

function useJoinBoard() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: joinBoard,
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.allBoards]);
			queryClient.invalidateQueries([QueryKeys.boardDetails]);
		},
	});
}

export default useJoinBoard;
