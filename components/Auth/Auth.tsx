import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AUTH_PROVIDERS } from "../../lib/config";
import { auth } from "../../lib/firebase";
import { capitalize } from "../../lib/helpers";
import { AuthAction, Provider, ServerError } from "../../lib/types";
import {
  AuthPayload,
  useLoginMutation,
  useSignUpMutation,
} from "../../stores/api/authApi";
import { setAccessToken } from "../../stores/userSlice";
import {
  DANGER_COLOR,
  DARK_GREY_COLOR,
  MEDIUM_GREY_COLOR,
  WHITE_COLOR,
} from "../../styles/theme";
import Input from "../Input";
import Logo from "../Logo";
import ProviderButton from "./ProviderButton";

type Props = {
  action: AuthAction;
};

const Auth = ({ action }: Props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const defaultValues: AuthPayload = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const capitalizedAction = capitalize(action);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
    auth as any
  );
  const [signUp] = useSignUpMutation();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(
    auth as any
  );
  const [login] = useLoginMutation();

  const authenticateUser = async ({
    email,
    password,
  }: AuthPayload): Promise<void> => {
    try {
      if (action === "login") {
        await signInWithEmailAndPassword(email, password);
        const response = await login({ email, password }).unwrap();
        const { accessToken } = response;
        dispatch(setAccessToken(accessToken));
      } else {
        await createUserWithEmailAndPassword(email, password);
        const response = await signUp({ email, password }).unwrap();
        const { accessToken } = response;
        dispatch(setAccessToken(accessToken));
      }
    } catch (err) {
      const responseError = err as ServerError;
      setError(responseError.data.message);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Container maxWidth="xs">
        <Card>
          <CardContent
            sx={{
              backgroundColor: DARK_GREY_COLOR,
              paddingBlock: 5,
              paddingInline: 3,
            }}
          >
            <Logo />
            <Typography
              variant="h4"
              mb={3}
              mt={5}
              sx={{ fontSize: { sm: "30px" } }}
              letterSpacing="1.5px"
            >
              {capitalizedAction}
            </Typography>
            <form onSubmit={handleSubmit(authenticateUser)}>
              <Stack gap={2}>
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@example.com"
                  error={Boolean(errors.email)}
                  errorMessage={errors.email?.message}
                  rules={{
                    required: {
                      value: true,
                      message: "Email can't be blank",
                    },
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                      message: "Wrong email format",
                    },
                  }}
                />
                <Input
                  control={control}
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  error={Boolean(errors.password)}
                  errorMessage={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          sx={{ color: "#FFF" }}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Password can't be blank",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                      message:
                        "Password must have at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
                    },
                  }}
                />
                <div>
                  {error && (
                    <Typography
                      textAlign="center"
                      mb={1}
                      sx={{ color: DANGER_COLOR }}
                    >
                      {error}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{ marginTop: 1, marginBottom: 3 }}
                    fullWidth
                  >
                    {capitalizedAction}
                  </Button>
                </div>
              </Stack>
            </form>
            <ProvidersList action={action} />
            <Box textAlign="center">
              {action === "login" ? (
                <Typography
                  sx={{
                    color: MEDIUM_GREY_COLOR,
                    "& a": { color: WHITE_COLOR, marginLeft: 1 },
                  }}
                >
                  Not a user yet?
                  <Button href="/signup" variant="outlined">
                    Create an account
                  </Button>
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: MEDIUM_GREY_COLOR,
                    "& a": { color: WHITE_COLOR, marginLeft: 1 },
                  }}
                >
                  Already have an account?
                  <Button href="/login" variant="outlined">
                    Login
                  </Button>
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
};

export default Auth;

type ProvidersListProps = {
  action: AuthAction;
};

const ProvidersList = ({ action }: ProvidersListProps) => {
  return (
    <Box>
      <Typography paragraph textAlign="center" color="text.secondary">
        Or {action === "login" ? "login" : "sign up"} using a social media
        account
      </Typography>
      <Stack flexDirection="row" gap={3} justifyContent="center" mb={3}>
        {AUTH_PROVIDERS.map(({ name, provider, icon }: Provider) => {
          return (
            <ProviderButton
              key={name}
              name={name}
              provider={provider}
              icon={icon}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
