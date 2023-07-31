import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

function Label({ children }: Props) {
	return <div className="rounded-lg bg-[#D5E6FB] px-2.5 py-[2px] text-[10px] text-primaryBlue">{children}</div>;
}

export default Label;
