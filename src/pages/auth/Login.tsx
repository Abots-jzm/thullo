import { useForm } from "react-hook-form";
import Layout from "../../components/auth/Layout";
import { AuthPayload } from "../../hooks/auth/types";
import useLogin from "../../hooks/auth/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

function Login() {
	const { register, handleSubmit } = useForm<AuthPayload>();
	const { mutate: login, isLoading, error } = useLogin();
	const navigate = useNavigate();

	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== routes.login && prevPath !== routes.signup ? prevPath : routes.home;

	function onSubmit(payload: AuthPayload) {
		login(payload, {
			onSuccess: () => navigate(routes.home, { replace: true }),
		});
	}

	return (
		<Layout
			mode="login"
			register={register}
			onSubmit={handleSubmit(onSubmit)}
			isLoading={isLoading}
			error={error}
			nextPath={nextPath}
		/>
	);
}

export default Login;
