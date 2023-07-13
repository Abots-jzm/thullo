import { MdAdd } from "react-icons/md";
import BoardCard from "../components/home/BoardCard";
import { useState } from "react";
import CreateBoardModal from "../components/home/CreateBoardModal";

function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<div className="h-full bg-offWhite pt-16">
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
				<ul className="grid grid-cols-fluid gap-6 pt-9">
					<BoardCard />
					<BoardCard />
					<BoardCard />
					<BoardCard />
					<BoardCard />
				</ul>
			</div>

			<CreateBoardModal isOpen={modalIsOpen} close={closeModal} />
		</div>
	);
}

export default Home;
