import { Fab } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";
import { AccessToken, Provider, ResponseData } from "../../lib/types";
import { useSignInWithProviderMutation } from "../../stores/api/authApi";
import { RootState } from "../../stores/store";
import { setAccessToken } from "../../stores/userSlice";
import { LIGHT_BACKGROUND_COLOR, PRIMARY_COLOR } from "../../styles/theme";

const ProviderButton = ({ name, provider, icon }: Provider) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [authenticateOnServer] = useSignInWithProviderMutation();

  const [_user, _loading, _error] = useAuthState(auth as any, {
    onUserChanged: async (usr) => {
      if (usr && !accessToken) {
        const { uid, email } = usr;

        const response = (await authenticateOnServer({
          email: email!,
          password: uid,
        })) as ResponseData<AccessToken>;

        const token = response.data;
        dispatch(setAccessToken(token));
      }
    },
  });

  const handleClick = async () => {
    try {
      await signInWithPopup(auth as any, provider);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message
          .replace("Firebase: ", "")
          .replace(/\(auth.*/, "");

        toast.error(errorMessage);
      }
    }
  };

  return (
    <Fab
      onClick={handleClick}
      aria-label={name}
      size="small"
      sx={{
        backgroundColor: LIGHT_BACKGROUND_COLOR,

        "&:hover": {
          backgroundColor: PRIMARY_COLOR,
        },
      }}
    >
      {icon}
    </Fab>
  );
};

export default ProviderButton;
