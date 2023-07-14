export function acronym(name: string) {
	const words = name.split(" ");

	if (words.length === 1) {
		return words[0].substring(0, 2);
	}

	return words[0][0] + (words[1][0] || words[0][1]);
}
