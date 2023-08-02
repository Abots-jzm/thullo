import { MdAdd, MdAttachFile, MdComment } from "react-icons/md";
import Label from "./Label";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./types";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

type Props = {
	id: string | number;
	title: string;
	data: Item;
};

function ListCard({ title, id, data }: Props) {
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id, data });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={clsx(
				"rounded-lg bg-white p-3 shadow-shadow3",
				isDragging && "relative z-50 cursor-grabbing border border-dashed border-primaryBlue bg-[#E2E8F6]"
			)}
		>
			<div className={clsx(isDragging && "opacity-0")}>
				<div className="mb-3 h-32 overflow-hidden rounded-xl">
					<img
						src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
						alt="pic"
					/>
				</div>
				<div>{title}</div>
				<div className="mt-5 flex flex-wrap items-center gap-3">
					<Label>Concept</Label>
				</div>
				<div className="mt-5 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<button className="grid h-7 w-7 place-items-center rounded-lg bg-primaryBlue text-xl text-white">
							<MdAdd />
						</button>
					</div>
					<div className="flex gap-2.5 text-grey1">
						<div className="flex items-center gap-1 text-[10px]">
							<MdComment />
							<div>2</div>
						</div>
						<div className="flex items-center gap-1 text-[10px]">
							<MdAttachFile />
							<div>1</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListCard;
