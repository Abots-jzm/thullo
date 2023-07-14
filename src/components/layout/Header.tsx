import { MdApps, MdArrowDropDown, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import LogoSVG from "../../assets/logo.svg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import useLogout from "../../hooks/auth/useLogout";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";
import Avatar from "../home/Avatar";
import clsx from "clsx";

function Header() {
	const { data: userProfile } = useGetUserProfile();
	const { mutate: logout } = useLogout();
	const { pathname } = useLocation();
	const isHome = pathname === routes.home;

	return (
		<header className="sticky top-0 flex items-center justify-between gap-4 bg-white px-3 pb-3 pt-5 shadow-shadow1 sm:px-7">
			<div className="flex items-center gap-16 lg:gap-24">
				<div
					className={clsx("items-center gap-2 lg:gap-3", {
						"hidden lg:flex": !isHome,
						"flex text-sm ": isHome,
					})}
				>
					<div className="h-6 lg:h-auto">
						<img src={LogoSVG} alt="thullo logo" />
					</div>
					<div className="font-poppins font-semibold lg:text-lg">Thullo</div>
				</div>
				{!isHome && (
					<div className="flex items-center gap-6">
						<div className="hidden font-poppins text-lg font-medium sm:block">Devchallenges Board</div>
						<div className="hidden h-8 w-[1px] bg-grey2 sm:block" />
						<Link
							to={routes.home}
							className="flex items-center gap-3 rounded-lg bg-grey3 px-4 py-2.5 text-[12px] text-ash"
						>
							<MdApps />
							<span className="whitespace-nowrap">All boards</span>
						</Link>
					</div>
				)}
			</div>
			<div className="flex items-center gap-10 text-[12px]">
				<form className="hidden max-w-[338px] flex-1 rounded-lg p-0.5 shadow-shadow2 md:flex">
					<input
						className="w-full flex-1 px-3 py-2.5 placeholder:font-poppins  placeholder:text-grey1 focus:outline-none"
						type="text"
						placeholder="Keyword..."
					/>
					<button className="rounded-lg bg-primaryBlue px-5 py-2 font-poppins text-white" type="submit">
						Search
					</button>
				</form>
				<Menu as="div" className="relative">
					<Menu.Button className="flex items-center gap-1 sm:gap-4">
						<div className="hidden h-8 w-8 overflow-hidden rounded-lg text-[12px] sm:block ">
							<Avatar name={userProfile?.name || "-"} photoUrl={userProfile?.photoUrl} />
						</div>
						<span className="font-bold">{userProfile?.name}</span>
						<div className="grid place-items-center text-lg">
							<MdArrowDropDown />
						</div>
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 top-10 z-10 w-48 divide-y divide-grey2 rounded-lg border bg-white p-3 font-medium shadow-shadow1 focus:outline-none">
							<Menu.Item
								as={Link}
								to={routes.profile}
								className="mb-3 flex items-center gap-3 rounded-lg p-3 ui-active:bg-grey3"
							>
								<div className="grid place-items-center text-lg">
									<FaUserCircle />
								</div>
								<span>Edit Profile</span>
							</Menu.Item>
							<Menu.Item as="button" className="w-full pt-3 text-left" onClick={() => logout()}>
								<div className=" flex items-center gap-3 rounded-lg p-3 text-primaryRed ui-active:bg-grey3">
									<div className="grid place-items-center text-lg">
										<MdLogout />
									</div>
									<span>Logout</span>
								</div>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</header>
	);
}

export default Header;
