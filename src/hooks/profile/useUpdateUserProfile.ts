import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, getDocs, or, query, where, writeBatch } from "firebase/firestore";
import { QueryKeys } from "../data";
import { UserProfile, ProfilePayload } from "./types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { apiRoutes } from "../../api/routes";

async function updateProfile({ name, userId, photo, previousProfile }: ProfilePayload) {
	let photoUrl;

	if (photo) {
		const imagesRef = ref(storage, userId + "/photo");
		const snapShot = await uploadBytes(imagesRef, photo);
		photoUrl = await getDownloadURL(snapShot.ref);
	}

	const newProfile: UserProfile = { userId, name };
	if (photoUrl) newProfile.photoUrl = photoUrl;

	const batch = writeBatch(db);
	batch.set(doc(db, apiRoutes.users, userId), newProfile, { merge: true });

	if (previousProfile) {
		const boardsRef = collection(db, apiRoutes.boards);
		const userBoardsQuery = query(
			boardsRef,
			or(where("admin", "==", newProfile), where("members", "array-contains", previousProfile))
		);
		const userBoards = (await getDocs(userBoardsQuery)).docs;
		userBoards.forEach((boardDoc) => {
			const docRef = doc(db, apiRoutes.boards, boardDoc.id);
			batch.update(docRef, newProfile);
		});
	}

	return await batch.commit();
}

function useUpdateUserProfile() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess() {
			queryClient.invalidateQueries([QueryKeys.profile]);
			queryClient.invalidateQueries([QueryKeys.allBoards]);
			navigate(routes.home);
		},
	});
}

export default useUpdateUserProfile;
