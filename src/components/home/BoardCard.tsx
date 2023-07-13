import BlankPNG from "../../assets/blank-profile-picture.png";

function BoardCard() {
	return (
		<li className="cursor-pointer rounded-xl bg-white p-3 pb-4 shadow-shadow3">
			<div className="h-32 overflow-hidden rounded-lg">
				<img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt={"board" + " cover"} />
			</div>
			<div className="mt-3 font-medium">DevChallenges Board</div>
			<div className="mt-5 flex items-center gap-3 text-[12px]">
				<div className="h-7 w-7 overflow-hidden rounded-lg">
					<img src={BlankPNG} alt={"name" + " pic"} />
				</div>
				<div className="h-7 w-7 overflow-hidden rounded-lg">
					<div className="grid h-full w-full place-items-center bg-grey1  text-white">TN</div>
				</div>
				<div className="h-7 w-7 overflow-hidden rounded-lg">
					<img src={BlankPNG} alt={"name" + " pic"} />
				</div>
				<div className="font-medium text-grey1">+ 5 others</div>
			</div>
		</li>
	);
}

export default BoardCard;
