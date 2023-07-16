import { MdLock, MdMoreHoriz } from "react-icons/md";
import { useParams } from "react-router-dom";
import Avatar from "../components/home/Avatar";
import useGetBoardDetails from "../hooks/home/useGetBoardDetails";
import Loading from "../components/home/Loading";
import AddUser from "../components/home/AddUser";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";

function Board() {
	const { boardId } = useParams();
	const { data: boardDetails, isLoading: boardDetailsLoading } = useGetBoardDetails(boardId);
	const { data: userProfile } = useGetUserProfile();

	if (boardDetailsLoading)
		return (
			<div className="mx-auto mt-24 text-center">
				<Loading />
			</div>
		);

	return (
		<main className="mt-9 flex justify-between px-3 sm:px-7">
			<div className="flex items-center gap-4">
				{boardDetails?.isPrivate && (
					<div className="flex items-center gap-3 rounded-lg border border-grey1 px-4 py-2 font-poppins text-sm font-medium text-ash">
						<MdLock />
						<span>Private</span>
					</div>
				)}
				{boardDetails && (
					<div className="h-8 w-8 overflow-hidden rounded-lg">
						<Avatar name={boardDetails?.admin.name} key="admin" photoUrl={boardDetails.admin.photoUrl} />
					</div>
				)}
				{boardDetails?.members.slice(0, 2).map((member, i) => (
					<div className="h-8 w-8 overflow-hidden rounded-lg" key={member.userId}>
						<Avatar name={member.name} key={member.name + "-" + i} photoUrl={member.photoUrl} />
					</div>
				))}
				{boardDetails?.isPrivate && boardDetails.admin.userId === userProfile?.userId && <AddUser />}
				{boardDetails?.members && boardDetails.members.length > 2 && (
					<div className="text-sm text-grey1">+ {boardDetails.members.length - 2} others</div>
				)}
			</div>
			<button className="flex items-center gap-3 rounded-lg bg-grey3 px-3 py-2 font-poppins text-sm font-medium text-ash">
				<MdMoreHoriz />
				<span>Show Menu</span>
			</button>
		</main>
	);
}

export default Board;
