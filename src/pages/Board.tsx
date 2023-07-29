import { useParams } from "react-router-dom";
import useGetBoardDetails from "../hooks/home/useGetBoardDetails";
import Loading from "../components/home/Loading";
import BoardHeader from "../components/board/BoardHeader";
import BoardBody from "../components/board/BoardBody";

function Board() {
	const { boardId } = useParams();
	const { data: boardDetails, isLoading: boardDetailsLoading } = useGetBoardDetails(boardId);

	if (boardDetailsLoading)
		return (
			<div className="mx-auto mt-24 text-center">
				<Loading />
			</div>
		);

	return (
		<main className="relative h-full flex-1 px-3 pt-9 sm:px-7">
			<BoardHeader boardDetails={boardDetails} />
			<BoardBody />
		</main>
	);
}

export default Board;
