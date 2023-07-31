import { ReactNode } from "react";
import { MdAdd, MdMoreHoriz } from "react-icons/md";

type Props = {
	title: string;
	children: ReactNode;
};

function List({ title, children }: Props) {
	return (
		<div className="w-60 flex-shrink-0">
			<div className="flex items-center justify-between">
				<div className="font-poppins text-sm font-medium">{title}</div>
				<button>
					<MdMoreHoriz />
				</button>
			</div>
			<div className="mt-4 flex flex-col gap-6">
				{children}
				<button className="flex items-center justify-between rounded-lg bg-[#DAE4FD] px-3 py-2 text-[12px] text-primaryBlue">
					<div>Add another card</div>
					<MdAdd />
				</button>
			</div>
		</div>
	);
}

export default List;
