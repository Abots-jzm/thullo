import { ReactNode, useMemo } from "react";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
import { Item, ListType } from "./types";
import ListCard from "./ListCard";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type Props = {
	list: ListType;
	children?: ReactNode;
	deleteList: (id: string | number) => void;
	createItem: (id: string | number) => void;
	items: Item[];
};

function List({ list, deleteList, createItem, items }: Props) {
	const itemsId = useMemo(() => items.map((item) => item.id), [items]);
	const { setNodeRef } = useDroppable({ id: list.id, data: { type: "List" } });

	return (
		<div className="w-60 flex-shrink-0" ref={setNodeRef}>
			<div className="flex items-center justify-between">
				<div className="font-poppins text-sm font-medium">{list.title}</div>
				<button onClick={() => deleteList(list.id)}>
					<MdMoreHoriz />
				</button>
			</div>
			<div className="mt-4 flex flex-col gap-6">
				<SortableContext items={itemsId}>
					{items.map((item) => (
						<ListCard key={item.id} id={item.id} title={item.content} data={item} />
					))}
				</SortableContext>
				<button
					onClick={() => createItem(list.id)}
					className="flex items-center justify-between rounded-lg bg-[#DAE4FD] px-3 py-2 text-[12px] text-primaryBlue"
				>
					<div>Add another card</div>
					<MdAdd />
				</button>
			</div>
		</div>
	);
}

export default List;
