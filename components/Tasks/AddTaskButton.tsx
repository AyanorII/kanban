import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ModalType } from "../../lib/types";
import { MEDIUM_GREY_COLOR } from "../../styles/theme";
import Input from "../Input";
import Modal from "../Modal";

const AddTaskButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddNewTaskModal open={open} onClose={handleClose} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<AddIcon />}
        sx={{
          ".MuiButton-startIcon": {
            marginLeft: { xs: 0, md: -0.5 },
            marginRight: { xs: 0, md: 0.5 },
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight="inherit"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Add new task
        </Typography>
      </Button>
    </>
  );
};

export default AddTaskButton;
export interface AddTaskPayload {
  title: string;
  description: string;
  status: string;
  subtasks: { title: string }[];
}

const AddNewTaskModal = ({ open, onClose }: ModalType) => {
  const defaultValues: AddTaskPayload = {
    title: "",
    description: "",
    status: "",
    subtasks: [],
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit = (data: AddTaskPayload) => {
    console.log(data);
  };

  const SUBTASK_PLACEHOLDERS = [
    "Make coffee",
    "Drink coffee & smile",
    "Learn programming",
    "Smile :)",
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" mb={3}>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          {/* ---------------------------- TItle --------------------------- */}
          <Input
            control={control}
            name="title"
            placeholder="e.g. Take coffee break"
            label="Title"
            rules={{
              required: { value: true, message: "Title can't be blank" },
            }}
            error={Boolean(errors.title)}
            errorMessage={errors.title?.message}
          />
          {/* ---------------------------- TItle --------------------------- */}
          {/* ------------------------- Description ------------------------ */}
          <Input
            control={control}
            type="text"
            name="description"
            placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little."
            label="Description"
            multiline
            error={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
          {/* ------------------------- Description ------------------------ */}
          {/* -------------------------- Subtasks -------------------------- */}
          <Stack gap={1}>
            <InputLabel>Subtasks</InputLabel>
            {fields.map((field, index) => {
              return (
                <Stack key={field.id} flexDirection="row" gap={1}>
                  <Controller
                    control={control}
                    name={`subtasks.${index}`}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        fullWidth
                        placeholder={`e.g. ${SUBTASK_PLACEHOLDERS[index]}`}
                        value={controllerField.value.title}
                      />
                    )}
                  />
                  <IconButton aria-label="delete" onClick={() => remove(index)}>
                    <CloseIcon sx={{ color: MEDIUM_GREY_COLOR }} />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => append({ title: "" })}
          >
            + Add New Subtask
          </Button>
          {/* --------------------------- Subtasks ------------------------- */}
          {/* ---------------------------- Status -------------------------- */}
          <Stack gap={1}>
            <InputLabel>Status</InputLabel>
            <Controller
              control={control}
              name="status"
              rules={{
                required: { value: true, message: "Status can't be blank" },
              }}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="todo">Todo</MenuItem>
                  <MenuItem value="doing">Doing</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              )}
            />
          </Stack>
          {/* ---------------------------- Status -------------------------- */}
          <Button variant="contained" color="primary" type="submit">
            Create Task
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
