import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { MdClose, MdImage, MdLock, MdAdd } from "react-icons/md";
import { NewBoardForm } from "./types";
import useCreateNewBoard from "../../hooks/home/useCreateNewBoard";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";

type Props = {
	isOpen: boolean;
	close: () => void;
};

function CreateBoardModal({ isOpen, close }: Props) {
	const { mutate: createNewBoard, isLoading: isCreating } = useCreateNewBoard();
	const { data: userProfile } = useGetUserProfile();

	const { register, handleSubmit, watch, resetField } = useForm<NewBoardForm>();
	const coverPhoto = watch("cover")?.[0];

	function onSubmit({ title, isPrivate, cover }: NewBoardForm) {
		if (!userProfile) return;

		createNewBoard({
			title,
			isPrivate,
			cover: cover?.[0],
			admin: userProfile,
		});
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog onClose={close}>
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					as={Fragment}
				>
					<div className="fixed inset-0 bg-black/10" aria-hidden="true" />
				</Transition.Child>
				<div className="fixed inset-0 z-50 grid place-items-center">
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						as={Fragment}
					>
						<Dialog.Panel
							as="form"
							className="w-full max-w-xs rounded-lg bg-white px-6 pb-4 pt-7 font-poppins font-medium shadow-shadow1"
							onSubmit={handleSubmit(onSubmit)}
						>
							{coverPhoto && (
								<div className="relative mb-2.5">
									<div className="h-20 overflow-hidden rounded-lg">
										<button
											type="button"
											className="absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-lg bg-primaryBlue text-2xl text-white"
											onClick={() => resetField("cover")}
										>
											<MdClose />
										</button>
										<img src={URL.createObjectURL(coverPhoto)} alt={"name" + " cover"} />
									</div>
								</div>
							)}
							<input
								{...register("title")}
								className="w-full rounded-lg border border-grey2 px-4 py-2.5 text-[12px] shadow-shadow2 outline-none placeholder:text-grey1"
								type="text"
								placeholder="Add board title"
								required
							/>
							<div className="mt-5 flex items-center gap-5 text-sm">
								<>
									<input {...register("cover")} className="hidden" type="file" id="cover" />
									<label
										htmlFor="cover"
										className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-grey3 p-2 text-ash"
									>
										<MdImage />
										<span>Cover</span>
									</label>
								</>
								<>
									<input {...register("isPrivate")} type="checkbox" id="isPrivate" className="peer hidden" />
									<label
										htmlFor="isPrivate"
										className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-grey3 p-2 text-ash transition-colors duration-300 peer-checked:bg-primaryBlue peer-checked:text-white"
									>
										<MdLock />
										<span>Private</span>
									</label>
								</>
							</div>
							<div className="mt-6 flex items-center justify-end gap-4 text-sm">
								<button type="button" className="text-ash" onClick={close} disabled={isCreating}>
									Cancel
								</button>
								<button
									type="submit"
									className="flex items-center gap-2.5 rounded-lg bg-primaryBlue px-3 py-2 text-white disabled:opacity-75"
									disabled={isCreating}
								>
									{!isCreating && <MdAdd />}
									<span>{isCreating ? "Creating" : "Create"}</span>
									{isCreating && <div className="h-5 w-5 animate-spin rounded-full border-l-2" />}
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default CreateBoardModal;
