import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AuthAction, ResponseError } from "../lib/types";
import {
  AuthPayload,
  useLoginMutation,
  useSignupMutation,
} from "../stores/api/authApi";
import { setAccessToken } from "../stores/userSlice";
import {
  DANGER_COLOR,
  DARK_GREY_COLOR,
  MEDIUM_GREY_COLOR,
  WHITE_COLOR,
} from "../styles/theme";
import Input from "./Input";

type Props = {
  action: AuthAction;
};

const Auth = ({ action }: Props) => {
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (window) {
      const accessToken = window.localStorage.getItem("accessToken");

      if (accessToken) {
        router.push("/");
      }
    }
  }, []);

  const defaultValues: AuthPayload = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const capitalizedAction = action[0].toUpperCase() + action.slice(1);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const dispatch = useDispatch();

  const onSubmit = async (data: AuthPayload): Promise<void> => {
    try {
      const response =
        action === "login"
          ? await login(data).unwrap()
          : await signup(data).unwrap();

      if (response!.accessToken) {
        dispatch(setAccessToken(response!.accessToken));
        router.push("/");
      }

    } catch (err) {
      const responseError = err as ResponseError;
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
            <Typography variant="h4" color="white" mb={3}>
              {capitalizedAction}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={3}>
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@example.com"
                  error={Boolean(errors.email)}
                  errorMessage={errors.email?.message}
                  rules={{
                    required: { value: true, message: "Email can't be blank" },
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
                  type="password"
                  placeholder="********"
                  error={Boolean(errors.password)}
                  errorMessage={errors.password?.message}
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
            <Box textAlign="center">
              {action === "login" ? (
                <Link href="/signup">Create an account</Link>
              ) : (
                <>
                  <Typography
                    sx={{
                      color: MEDIUM_GREY_COLOR,
                      "& a": { color: WHITE_COLOR, marginLeft: 1 },
                    }}
                  >
                    Already have an account?
                    <Link href="/login">Login</Link>
                  </Typography>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
};

export default Auth;
