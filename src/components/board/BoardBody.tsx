import { useState } from "react";
import List from "./List";
import ListCard from "./ListCard";
import { MdAdd } from "react-icons/md";
import { Item, ListType } from "./types";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function BoardBody() {
	const [lists, setLists] = useState<ListType[]>([]);
	const [items, setItems] = useState<Item[]>([]);

	const [activeItem, setActiveItem] = useState<Item | null>(null);

	function createNewList() {
		const listToAdd: ListType = {
			id: Math.floor(Math.random() * 10_001),
			title: `List ${lists.length + 1}`,
		};
		setLists((prev) => [...prev, listToAdd]);
	}

	function deleteList(id: string | number) {
		const filtereLists = lists.filter((list) => list.id !== id);
		setLists(filtereLists);
	}

	function createItem(listId: string | number) {
		const newItem: Item = {
			id: Math.floor(Math.random() * 10_001),
			listId: listId,
			content: `item ${items.length + 1}`,
		};

		setItems((prev) => [...prev, newItem]);
	}

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current) setActiveItem(event.active.data.current as Item);
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		if (over.data.current?.type === "List") {
			setItems((items) => {
				const activeIndex = items.findIndex((item) => item.id === activeId);

				items[activeIndex].listId = overId;

				return arrayMove(items, activeIndex, activeIndex);
			});
		} else {
			setItems((items) => {
				const activeIndex = items.findIndex((item) => item.id === activeId);
				const overIndex = items.findIndex((item) => item.id === overId);

				items[activeIndex].listId = items[overIndex].listId;

				return arrayMove(items, activeIndex, overIndex);
			});
		}
	}

	function onDragEnd() {
		setActiveItem(null);
	}

	return (
		<DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
			<div className="mt-12 flex gap-8">
				{lists.map((list) => (
					<List
						list={list}
						key={list.id}
						deleteList={deleteList}
						createItem={createItem}
						items={items.filter((item) => list.id === item.listId)}
					/>
				))}
				<button
					className="flex w-60 flex-shrink-0 items-center justify-between self-start rounded-lg bg-[#DAE4FD] px-3 py-2 text-[12px] text-primaryBlue"
					onClick={createNewList}
				>
					<div>Add another list</div>
					<MdAdd />
				</button>
			</div>
			{createPortal(
				<DragOverlay>
					{activeItem && <ListCard data={activeItem} id={activeItem.id} title={activeItem.content} />}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	);
}

export default BoardBody;
