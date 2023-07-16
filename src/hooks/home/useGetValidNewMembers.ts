import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";
import { apiRoutes } from "../../api/routes";
import { ValidNewMembersPayload } from "./types";
import { UserProfile } from "../profile/types";

async function getValidNewMembers({ admin, members }: { admin?: UserProfile; members?: UserProfile[] }) {
	if (!admin || !members) throw new Error("something went wrong");

	const allMembers = [admin, ...members];

	const usersRef = collection(db, apiRoutes.users);
	const allUsers = (await getDocs(usersRef)).docs.map((doc) => doc.data()) as UserProfile[];
	return allUsers.filter((user) => !allMembers.find((member) => member.userId === user.userId));
}

function useGetValidNewMembers({ boardId, ...rest }: ValidNewMembersPayload) {
	return useQuery({
		queryKey: [QueryKeys.validNewMembers, boardId],
		queryFn: () => getValidNewMembers(rest),
	});
}

export default useGetValidNewMembers;
