import { MdAdd } from "react-icons/md";
import BoardCard from "../components/home/BoardCard";
import { useState } from "react";
import CreateBoardModal from "../components/home/CreateBoardModal";
import useGetAllBoards from "../hooks/home/useGetAllBoards";
import Loading from "../components/home/Loading";

function Home() {
	const { data: allBoards, isLoading: isLoadingBoards } = useGetAllBoards();

	const [modalIsOpen, setModalIsOpen] = useState(false);

	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<main className="h-full bg-offWhite pt-8 sm:pt-16">
			<div className="mx-auto max-w-5xl px-3">
				<div className="flex items-center justify-between">
					<div className=" font-poppins text-lg font-medium">All Boards</div>
					<button
						className="flex items-center gap-1 rounded-lg bg-primaryBlue px-3 py-2 text-white"
						onClick={openModal}
					>
						<MdAdd />
						<span>Add</span>
					</button>
				</div>
				{isLoadingBoards && (
					<div className="mx-auto pt-16 text-center">
						<Loading />
					</div>
				)}
				{!isLoadingBoards && (
					<ul className="grid grid-cols-fluid gap-6 pt-9">
						{allBoards?.map(({ id, coverUrl, title, admin, members }) => (
							<BoardCard id={id} coverUrl={coverUrl} admin={admin} members={members} title={title} key={id} />
						))}
					</ul>
				)}
			</div>

			<CreateBoardModal isOpen={modalIsOpen} close={closeModal} />
		</main>
	);
}

export default Home;
