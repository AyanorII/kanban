import { InputLabel, Stack, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = {
  name: string;
  type?: "text" | "password" | "email" | "number" | "date";
  label: string;
  error: boolean;
  errorMessage?: string;
  control: Control<any>;
  rules: {
    required: {
      value: boolean;
      message: string;
    };
  };
  placeholder?: string;
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
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Stack gap={1}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <TextField
            {...field}
            type={type || "text"}
            error={error}
            helperText={errorMessage}
            placeholder={placeholder}
          />
        </Stack>
      )}
    ></Controller>
  );
};

export default Input;
