import { useAppDispatch } from "./../../store/hooks";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { authActions } from "../../store/slices/authSlice";
import { AuthPayload } from "./types";
import { FirebaseError } from "firebase/app";

async function login(payload: AuthPayload) {
  return await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );
}

function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => dispatch(authActions.login(data.user.uid)),
    onError: (error: FirebaseError) => error,
  });
}

export default useLogin;
