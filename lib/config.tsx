import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthProvider, Provider } from "./types";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const AUTH_PROVIDERS: Provider[] = [
  {
    name: "google",
    provider: new GoogleAuthProvider(),
    icon: <GoogleIcon />,
  },
  {
    name: "github",
    provider: new GithubAuthProvider(),
    icon: <GitHubIcon />,
  },
  {
    name: "facebook",
    provider: new FacebookAuthProvider(),
    icon: <FacebookIcon />,
  }
];
