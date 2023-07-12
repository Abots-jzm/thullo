import { useForm } from "react-hook-form";
import Layout from "../../components/auth/Layout";
import { AuthPayload } from "../../hooks/auth/types";
import useSignup from "../../hooks/auth/useSignup";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

function Signup() {
	const { register, handleSubmit } = useForm<AuthPayload>();
	const { mutate: signup, isLoading, error } = useSignup();
	const navigate = useNavigate();

	function onSubmit(payload: AuthPayload) {
		signup(payload, {
			onSuccess: () => navigate(routes.profile, { replace: true }),
		});
	}

	return (
		<Layout mode="signup" register={register} onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} error={error} />
	);
}

export default Signup;
