import List from "./List";
import ListCard from "./ListCard";

function BoardBody() {
	return (
		<div className="mt-12 flex gap-8">
			<List title="Backlog">
				<ListCard />
			</List>
			<List title="Backlog">
				<ListCard />
			</List>
			<List title="Backlog">
				<ListCard />
			</List>
		</div>
	);
}

export default BoardBody;
