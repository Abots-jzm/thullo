import { UseFormRegister } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/logo.svg";
import { AuthPayload } from "../../hooks/auth/types";
import { routes } from "../../routes";
import { FirebaseError } from "firebase/app";
import useGuestLogin from "../../hooks/auth/useGuestLogin";

type Props = {
	mode: "signup" | "login";
	register: UseFormRegister<AuthPayload>;
	onSubmit: () => void;
	isLoading: boolean;
	error: FirebaseError | null;
	nextPath?: string;
};

function Layout({ mode, register, onSubmit, isLoading, error, nextPath }: Props) {
	const navigate = useNavigate();
	const { mutate: guestLogin, isLoading: guestLoading, error: guestError } = useGuestLogin();

	async function onGuestSubmit() {
		guestLogin(undefined, {
			onSuccess({ user }) {
				const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

				if (isNewUser) navigate(routes.profile);
				else navigate(nextPath || routes.home, { replace: true });
			},
		});
	}

	return (
		<div className="mt-6 grid h-auto w-full place-items-start bg-white sm:mb-0 sm:h-screen sm:place-items-center">
			<div className="w-full rounded-xl p-5 sm:max-w-[480px] sm:p-12 sm:shadow-light ">
				<div className="flex items-center gap-3">
					<div>
						<img src={LogoSVG} alt="thullo logo" />
					</div>
					<div className="font-poppins text-lg font-semibold">Thullo</div>
				</div>
				<div className="mt-7 text-lg font-bold capitalize">{mode}</div>
				<form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
					<div className="relative">
						<div className="absolute left-3 top-2.5 grid place-items-center text-xl text-ash">
							<MdEmail />
						</div>
						<input
							{...register("email")}
							className="w-full rounded-lg border border-grey1 p-2 pl-[42px] placeholder:text-ash"
							type="email"
							placeholder="Email"
							required
						/>
					</div>
					<div className="relative">
						<div className="absolute left-3 top-2.5 grid place-items-center text-xl text-ash">
							<IoMdLock />
						</div>
						<input
							{...register("password")}
							className="w-full rounded-lg border border-grey1 p-2 pl-[42px] placeholder:text-ash"
							type="password"
							placeholder="Password"
							required
						/>
					</div>
					<button
						className="flex items-center justify-center gap-5 rounded-lg bg-primaryBlue p-2 font-bold text-white disabled:opacity-75"
						type="submit"
						disabled={isLoading}
					>
						<span className="capitalize">{mode}</span>
						{isLoading && <div className="h-5 w-5 animate-spin rounded-full border-l-2" />}
					</button>
				</form>
				{error && <div className="mt-2 text-sm text-primaryRed">{error.message}</div>}
				<div className="mt-4 flex flex-col items-center text-sm text-ash">
					{mode === "login" && (
						<>
							<div>or</div>
							<button
								className="mt-4 flex w-full items-center justify-center gap-5 rounded-lg border border-ash bg-transparent p-2"
								onClick={onGuestSubmit}
							>
								<span>continue as guest</span>
								{guestLoading && <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-l-ash" />}
							</button>
							{guestError && <div className="mt-2 self-start text-sm text-primaryRed">{guestError.message}</div>}
						</>
					)}
					{mode === "login" && (
						<div className="mt-8">
							Don't have an account yet?{" "}
							<Link className="text-primaryBlue" to={routes.signup}>
								Register
							</Link>
						</div>
					)}
					{mode === "signup" && (
						<div>
							Already have an account?{" "}
							<Link className="text-primaryBlue" to={routes.login}>
								Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Layout;
