import { Timestamp } from "firebase/firestore";
import { UserProfile } from "../profile/types";

export type NewBoardPayload = {
	title: string;
	isPrivate: boolean;
	admin: UserProfile;
	cover?: File;
};

export type Board = {
	id: string;
	title: string;
	isPrivate: boolean;
	coverUrl?: string;
	admin: UserProfile;
	members: UserProfile[];
	description: string;
	createdAt: Timestamp;
};
