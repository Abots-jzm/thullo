import { Popover, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useRef, useState } from "react";
import { Board } from "../../hooks/home/types";
import { MdAccountCircle, MdClose, MdDescription, MdEdit } from "react-icons/md";
import Avatar from "../home/Avatar";
import { Timestamp } from "firebase/firestore";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";
import useUpdateBoardDescription from "../../hooks/home/useUpdateBoardDescription";
import useRemoveMember from "../../hooks/home/useRemoveMember";
import { UserProfile } from "../../hooks/profile/types";

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

type Props = {
	boardDetails?: Board;
};

function BoardMenu({ boardDetails }: Props) {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const [isEditting, setIsEditting] = useState(false);
	const [enteredDescription, setEnteredDescription] = useState(boardDetails?.description || "");

	const { data: userProfile } = useGetUserProfile();
	const { mutate: updateDescription, isLoading: isUpdating } = useUpdateBoardDescription();
	const { mutate: removeMember } = useRemoveMember();

	function formatTime(timestamp?: Timestamp) {
		if (!timestamp) return "-";

		const date = timestamp.toDate();
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		return `${day} ${MONTHS[month]}, ${year}`;
	}

	function AdjustTextAreaHeight() {
		if (!textAreaRef.current) return;
		textAreaRef.current.style.height = "";
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 8 + "px";
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!boardDetails?.id) return;

		updateDescription(
			{ boardId: boardDetails.id, description: enteredDescription },
			{
				onSuccess: () => setIsEditting(false),
			}
		);
	}

	function remove(member: UserProfile) {
		if (!boardDetails) return;

		removeMember({ boardId: boardDetails?.id, user: member });
	}

	return (
		<Transition
			enter="transition duration-300 ease-out"
			enterFrom="translate-x-full"
			enterTo="translate-x-0"
			leave="transition duration-200 ease-out"
			leaveFrom="translate-x-0"
			leaveTo="translate-x-full"
			as={Fragment}
		>
			<Popover.Panel className="absolute right-0 top-0 z-40 h-full w-full max-w-sm overflow-y-auto bg-white p-5">
				<div className="flex justify-between border-b border-b-grey2 pb-2">
					<div className="font-poppins text-sm font-semibold">{boardDetails?.title}</div>
					<Popover.Button className="text-xl">
						<MdClose />
					</Popover.Button>
				</div>
				<div className="my-3 flex items-center gap-1 font-poppins text-[10px] font-semibold text-grey1">
					<div>
						<MdAccountCircle />
					</div>
					<span>Made by</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 overflow-hidden rounded-lg">
						<Avatar name={boardDetails?.admin.name || "Admin"} photoUrl={boardDetails?.admin.photoUrl} />
					</div>
					<div>
						<div className="font-poppins text-sm font-semibold">{boardDetails?.admin.name}</div>
						<div className="text-[12px] font-semibold text-grey1">on {formatTime(boardDetails?.createdAt)}</div>
					</div>
				</div>
				<div className="mt-5 flex items-center gap-3 text-[10px]">
					<div className="my-3 flex items-center gap-1 font-poppins font-semibold text-grey1">
						<div>
							<MdDescription />
						</div>
						<span>Description</span>
					</div>
					{!isEditting && (
						<button
							onClick={() => setIsEditting(true)}
							className="flex items-center gap-2 rounded-lg border border-grey1 px-3 py-1 text-ash"
						>
							<MdEdit />
							<span>Edit</span>
						</button>
					)}
				</div>
				{!isEditting && <div className="mt-2 whitespace-pre-line text-sm">{boardDetails?.description}</div>}
				{isEditting && (
					<form onSubmit={handleSubmit}>
						<textarea
							className="h-52 w-full resize-none rounded-lg border border-grey1 p-3 text-sm"
							onInput={AdjustTextAreaHeight}
							ref={textAreaRef}
							onChange={(e) => setEnteredDescription(e.target.value)}
							value={enteredDescription}
						/>
						<div className="mt-2.5 flex gap-3 font-poppins text-[12px]">
							<button
								type="submit"
								disabled={isUpdating}
								className="flex items-center gap-2 rounded-lg bg-primaryGreen px-3 py-1 text-white disabled:opacity-75"
							>
								{isUpdating && <div className="h-3 w-3 animate-spin rounded-full border-l-2" />}
								<span>Save</span>
							</button>
							<button className="text-ash" onClick={() => setIsEditting(false)}>
								Cancel
							</button>
						</div>
					</form>
				)}
				<div className="mb-4 mt-6 flex items-center gap-1 font-poppins text-[10px] font-semibold text-grey1">
					<div>
						<MdDescription />
					</div>
					<span>Team</span>
				</div>
				<div className="flex flex-col gap-4 font-poppins text-[12px]">
					<div className="flex items-center gap-4">
						<div className="h-8 w-8 overflow-hidden rounded-lg">
							<Avatar name={boardDetails?.admin.name || "Admin"} photoUrl={boardDetails?.admin.photoUrl} />
						</div>
						<div className="font-semibold">{boardDetails?.admin.name}</div>
						<div className="ml-auto px-3 text-ash">Admin</div>
					</div>
					{boardDetails?.members.map((member) => (
						<div className="flex items-center gap-4" key={member.userId}>
							<div className="h-8 w-8 overflow-hidden rounded-lg">
								<Avatar name={member.name} photoUrl={member.photoUrl} />
							</div>
							<div className="font-semibold">{member.name}</div>
							{userProfile?.userId === boardDetails.admin.userId && (
								<button
									onClick={() => remove(member)}
									className="ml-auto rounded-lg border border-primaryRed px-2 py-1 text-primaryRed"
								>
									Remove
								</button>
							)}
						</div>
					))}
				</div>
			</Popover.Panel>
		</Transition>
	);
}

export default BoardMenu;
