import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { apiRoutes } from "../../api/routes";
import { UpdateDescriptionPayload } from "./types";
import { doc, updateDoc } from "firebase/firestore";

async function updateBoardDescription({ boardId, description }: UpdateDescriptionPayload) {
	return await updateDoc(doc(db, apiRoutes.boards, boardId), { description });
}

function useUpdateBoardDescription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateBoardDescription,
		onSuccess() {
			queryClient.invalidateQueries([QueryKeys.boardDetails]);
		},
	});
}

export default useUpdateBoardDescription;
