import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { apiRoutes } from "../../api/routes";
import { JoinBoardPayload } from "./types";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";

async function removeMember({ boardId, user }: JoinBoardPayload) {
	return await updateDoc(doc(db, apiRoutes.boards, boardId), {
		members: arrayRemove(user),
	});
}

function useRemoveMember() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeMember,
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.allBoards]);
			queryClient.invalidateQueries([QueryKeys.boardDetails]);
		},
	});
}

export default useRemoveMember;
