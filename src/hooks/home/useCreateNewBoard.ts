import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../data";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../api/firebase";
import { Board, NewBoardPayload } from "./types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../../api/routes";

async function createNewBoard({ isPrivate, title, admin, cover }: NewBoardPayload) {
	const newBoardRef = doc(collection(db, apiRoutes.boards));

	let coverUrl;
	if (cover) {
		const imagesRef = ref(storage, newBoardRef.id + "/cover");
		const snapShot = await uploadBytes(imagesRef, cover);
		coverUrl = await getDownloadURL(snapShot.ref);
	}

	const data: Board = {
		title,
		isPrivate,
		admin,
		id: newBoardRef.id,
		description: "Add a description",
		members: [],
		createdAt: Timestamp.now(),
	};
	if (coverUrl) data.coverUrl = coverUrl;

	await setDoc(newBoardRef, data);
	return newBoardRef.id;
}

function useCreateNewBoard() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createNewBoard,
		onSuccess(newBoardId) {
			navigate("/" + newBoardId);
			queryClient.invalidateQueries([QueryKeys.allBoards]);
		},
	});
}

export default useCreateNewBoard;
