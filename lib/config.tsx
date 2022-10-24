import GoogleIcon from "@mui/icons-material/Google";
import { AuthProvider } from "./types";

export const AUTH_PROVIDERS: AuthProvider[] = [
  {
    provider: "google",
    icon: <GoogleIcon />,
    url: process.env.NEXT_PUBLIC_API_URL + "/auth/google",
  },
];
