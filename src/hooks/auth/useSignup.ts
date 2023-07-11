import { useAppDispatch } from "./../../store/hooks";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { authActions } from "../../store/slices/authSlice";
import { AuthPayload } from "./types";
import { FirebaseError } from "firebase/app";

async function signup(payload: AuthPayload) {
  return await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );
}

function useSignup() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => dispatch(authActions.login(data.user.uid)),
    onError: (error: FirebaseError) => error,
  });
}

export default useSignup;
