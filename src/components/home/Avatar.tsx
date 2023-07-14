import { acronym } from "../../util";

type Props = {
	name: string;
	photoUrl?: string;
};

function Avatar({ photoUrl, name }: Props) {
	return (
		<>
			{photoUrl && <img src={photoUrl} alt={name + " pic"} />}
			{!photoUrl && (
				<div className="grid h-full w-full place-items-center bg-grey1 font-poppins uppercase text-white">
					{acronym(name)}
				</div>
			)}
		</>
	);
}

export default Avatar;
