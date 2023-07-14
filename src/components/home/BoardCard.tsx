import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../hooks/profile/types";
import Avatar from "./Avatar";
import GenericCoverJPG from "../../assets/generic cover.jpg";

type Props = {
	id: string;
	coverUrl?: string;
	title: string;
	admin: UserProfile;
	members: UserProfile[];
};

function BoardCard({ id, coverUrl, title, admin, members }: Props) {
	const navigate = useNavigate();

	return (
		<li onClick={() => navigate("/" + id)} className="cursor-pointer rounded-xl bg-white p-3 pb-4 shadow-shadow3">
			<div className="h-32 overflow-hidden rounded-lg">
				<img src={coverUrl || GenericCoverJPG} alt={title + " cover"} className={!coverUrl ? "object-right" : ""} />
			</div>
			<div className="mt-3 font-medium">{title}</div>
			<div className="mt-5 flex items-center gap-3 text-[12px]" key="admin">
				<div className="h-7 w-7 overflow-hidden rounded-lg">
					<Avatar photoUrl={admin.photoUrl} name={admin.name} />
				</div>
				{members.slice(0, 3).map((member) => (
					<div className="h-7 w-7 overflow-hidden rounded-lg" key={member.userId}>
						<Avatar photoUrl={member.photoUrl} name={member.name} />
					</div>
				))}
				{members.length > 2 && <div className="font-medium text-grey1">+ 5 others</div>}
			</div>
		</li>
	);
}

export default BoardCard;
