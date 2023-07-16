import { Popover, Transition } from "@headlessui/react";
import { MdAdd } from "react-icons/md";
import Avatar from "./Avatar";
import { Fragment, useState } from "react";
import useGetValidNewMembers from "../../hooks/home/useGetValidNewMembers";
import { useParams } from "react-router-dom";
import useGetBoardDetails from "../../hooks/home/useGetBoardDetails";
import useJoinBoard from "../../hooks/home/useJoinBoard";
import { UserProfile } from "../../hooks/profile/types";
import useLogout from "../../hooks/auth/useLogout";

function AddUser() {
	const { boardId } = useParams();
	const { mutate: joinBoard } = useJoinBoard();
	const { mutate: logout } = useLogout();
	const { data: boardDetails } = useGetBoardDetails(boardId);
	const { data: validNewMebers } = useGetValidNewMembers({
		admin: boardDetails?.admin,
		boardId: boardId,
		members: boardDetails?.members,
	});
	const [enteredSearch, setEnteredSearch] = useState("");
	const filteredValidMembers = validNewMebers
		?.filter((member) => member.name.toLowerCase().trim().startsWith(enteredSearch.toLowerCase().trim()))
		.slice(0, 3);

	function onValidMemberClick(member: UserProfile) {
		if (!boardId) {
			logout();
			return;
		}

		joinBoard({ boardId, user: member });
	}

	return (
		<Popover className="relative">
			<Popover.Button className="grid h-8 w-8 place-items-center rounded-lg bg-primaryBlue text-2xl text-white outline-none">
				<MdAdd />
			</Popover.Button>
			<Transition
				appear
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="absolute left-0 top-11 z-20 w-60 rounded-xl border border-grey2 bg-white p-2 text-sm shadow-shadow1">
					<div className="font-poppins font-semibold">Invite to Board</div>
					<div className="text-ash">Search users you want to invite</div>
					<input
						value={enteredSearch}
						onChange={(e) => setEnteredSearch(e.target.value)}
						type="text"
						placeholder="User..."
						className="mt-3 flex w-full rounded-lg px-3 py-2.5 shadow-shadow2 outline-none placeholder:text-[12px] placeholder:text-grey1"
					/>
					{filteredValidMembers && filteredValidMembers.length > 0 && !!enteredSearch && (
						<div className="mt-2.5 flex flex-col gap-1 rounded-lg border border-grey2 p-1 shadow-shadow2">
							{filteredValidMembers.map((member) => (
								<Popover.Button
									onClick={() => onValidMemberClick(member)}
									className="flex items-center gap-3 rounded-lg p-2 hover:bg-grey3"
								>
									<div className="h-8 w-8 overflow-hidden rounded-lg">
										<Avatar name={member.name} photoUrl={member.photoUrl} key={member.userId} />
									</div>
									<div className="font-poppins text-sm font-semibold">{member.name}</div>
								</Popover.Button>
							))}
						</div>
					)}
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

export default AddUser;
