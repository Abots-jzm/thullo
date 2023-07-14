import { useParams } from "react-router-dom";

function Board() {
	const { boardId } = useParams();

	return <div>{boardId}</div>;
}

export default Board;
