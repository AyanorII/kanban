import { Fab } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";
import { AuthProvider } from "../../lib/types";
import { useSignInWithProviderMutation } from "../../stores/api/authApi";
import { setAccessToken } from "../../stores/userSlice";

const ProviderButton = ({ provider, icon, url }: AuthProvider) => {
  const dispatch = useDispatch();
  const [signInWithGoogle] = useSignInWithGoogle(auth as any);

  const [_user, _loading, _error] = useAuthState(auth as any, {
    onUserChanged: async (user) => {
      if (user) {
        try {
          const { email, uid } = user;
          const accessToken = await signInWithProvider({
            provider: "google",
            authDto: {
              email: email!,
              password: uid,
            },
          }).unwrap();

          dispatch(setAccessToken(accessToken));
        } catch (err) {
          toast.error("Oops! Something went wrong. Please try again.", {
            theme: "colored",
          });
        }
      }
    },
  });

  const [signInWithProvider] = useSignInWithProviderMutation();

  const handleClick = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <button onClick={() => signOut(auth)}>tes</button>
      <Fab onClick={handleClick} aria-label={provider} size="small">
        {icon}
      </Fab>
    </>
  );
};

export default ProviderButton;
