import { MdLock, MdMoreHoriz } from "react-icons/md";
import { Board } from "../../hooks/home/types";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";
import Avatar from "../home/Avatar";
import AddUser from "../home/AddUser";
import BoardMenu from "./BoardMenu";
import { Fragment } from "react";
import { Popover } from "@headlessui/react";

type Props = {
	boardDetails?: Board;
};

function BoardHeader({ boardDetails }: Props) {
	const { data: userProfile } = useGetUserProfile();

	return (
		<Popover as={Fragment}>
			<div className="flex justify-between">
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
				<Popover.Button className="flex items-center gap-3 rounded-lg bg-grey3 px-3 py-2 font-poppins text-sm font-medium text-ash">
					<MdMoreHoriz />
					<span>Show Menu</span>
				</Popover.Button>
			</div>
			<BoardMenu boardDetails={boardDetails} />
		</Popover>
	);
}

export default BoardHeader;
