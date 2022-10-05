import { InputLabel, Stack, TextField } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { DANGER_COLOR, WHITE_COLOR } from "../styles/theme";

type Props = {
  name: string;
  type?: "text" | "password" | "email" | "number" | "date";
  label: string;
  error: boolean;
  errorMessage?: string;
  control: Control<any>;
  rules?: RegisterOptions;
  placeholder?: string;
  multiline?: boolean;
};

const Input = ({
  name,
  type,
  label,
  error,
  errorMessage,
  control,
  rules,
  placeholder,
  multiline,
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
            placeholder={placeholder}
            multiline={multiline || false}
          />
        </Stack>
      )}
    ></Controller>
  );
};

export default Input;
