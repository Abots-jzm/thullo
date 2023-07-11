import { useAppDispatch } from "./../../store/hooks";
import { signInAnonymously } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../api/firebase";
import { authActions } from "../../store/slices/authSlice";
import { FirebaseError } from "firebase/app";

async function guestLogin() {
  return await signInAnonymously(auth);
}

function useGuestLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => dispatch(authActions.login(data.user.uid)),
    onError: (error: FirebaseError) => error,
  });
}

export default useGuestLogin;
