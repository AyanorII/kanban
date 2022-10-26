import { InputLabel, Stack, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { DANGER_COLOR, WHITE_COLOR } from "../styles/theme";

type Props = {
  name: string;
  errorMessage?: string;
  control: Control<any>;
  rules?: RegisterOptions;
} & TextFieldProps;

const Input = ({
  name,
  type,
  label,
  error,
  errorMessage,
  control,
  rules,
  ...props
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Stack gap={1}>
          <InputLabel
            htmlFor={name}
            sx={{ color: error ? DANGER_COLOR : WHITE_COLOR }}
          >
            {label}
          </InputLabel>
          <TextField
            {...field}
            type={type || "text"}
            error={error}
            helperText={errorMessage}
            {...props}
          />
        </Stack>
      )}
    ></Controller>
  );
};

export default Input;
