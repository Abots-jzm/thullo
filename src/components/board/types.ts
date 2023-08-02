export type ListType = {
	id: string | number;
	title: string;
};

export type Item = {
	id: string | number;
	listId: string | number;
	content: string;
};
