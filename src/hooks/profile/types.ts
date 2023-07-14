export type UserProfile = {
	userId: string;
	name: string;
	photoUrl?: string;
};

export type ProfilePayload = {
	userId: string;
	name: string;
	photo?: File;
	previousProfile?: UserProfile;
};
