import { MdImage } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ProfileForm } from "./types";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import useUpdateUserProfile from "../hooks/profile/useUpdateUserProfile";
import { useAppSelector } from "../store/hooks";
import useLogout from "../hooks/auth/useLogout";
import Avatar from "../components/home/Avatar";

function Profile() {
	const { data: userProfile } = useGetUserProfile();
	const { mutate: updateProfile, isLoading: isUpdating } = useUpdateUserProfile();
	const userId = useAppSelector((state) => state.auth.userId);
	const { mutate: logout } = useLogout();

	const { register, handleSubmit, watch } = useForm<ProfileForm>({
		values: {
			name: userProfile?.name || "",
		},
	});
	const name = watch("name");

	function getPhoto() {
		const photo = watch("cover");
		if (photo && photo.length > 0) return URL.createObjectURL(photo[0]);
		return userProfile?.photoUrl;
	}

	function onSubmit({ name, cover }: ProfileForm) {
		if (!userId) {
			logout();
			return;
		}
		updateProfile({ name, userId, photo: cover?.[0], previousProfile: userProfile });
	}

	return (
		<div className="mt-6 grid h-auto w-full place-items-start bg-white sm:mb-0 sm:h-screen sm:place-items-center">
			<form
				className="w-full rounded-xl p-5 sm:max-w-[480px] sm:p-12 sm:shadow-light"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="text-lg font-bold capitalize">Profile</div>
				<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
					<div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg text-5xl">
						<Avatar name={name} photoUrl={getPhoto()} />
					</div>
					<div className="mt-6 flex flex-1 flex-col gap-4">
						<input {...register("cover")} type="file" id="photo" className="hidden" />
						<label
							htmlFor="photo"
							className="flex cursor-pointer items-center justify-center gap-2.5 self-start rounded-lg bg-primaryBlue p-2 text-white"
						>
							<MdImage />
							<span>choose photo</span>
						</label>
						<input
							{...register("name")}
							className="w-full rounded-lg border border-grey1 p-2 placeholder:text-ash"
							type="text"
							placeholder="name"
							required
						/>
					</div>
				</div>
				<button
					disabled={isUpdating}
					type="submit"
					className="float-right mt-7 flex items-center gap-2 rounded-lg bg-primaryBlue px-4 py-2 text-white disabled:opacity-75"
				>
					{isUpdating && <div className="h-5 w-5 animate-spin rounded-full border-l-2" />}
					<span>{isUpdating ? "Saving" : "Save"}</span>
				</button>
			</form>
		</div>
	);
}

export default Profile;
