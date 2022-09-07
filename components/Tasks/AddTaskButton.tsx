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
import { useSelector } from "react-redux";
import { Column, ModalType } from "../../lib/types";
import { useCreateTaskMutation } from "../../stores/api/tasksApi";
import { RootState } from "../../stores/store";
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
  column_id: Column["id"];
}

const AddNewTaskModal = ({ open, onClose }: ModalType) => {
  const columns = useSelector((state: RootState) => state.boards.columns);

  const defaultValues: AddTaskPayload = {
    title: "",
    description: "",
    status: columns[0].name,
    column_id: columns[0].id,
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

  const [createTask, { isLoading, error }] = useCreateTaskMutation();

  const onSubmit = async (data: AddTaskPayload) => {
    const { status } = data;

    const subtasks = data.subtasks.filter(
      (subtask) => typeof subtask === "string"
    ); // Remove empty subtasks

    const column = columns.find((column) => column.name === status);

    const payload: AddTaskPayload = {
      ...data,
      column_id: column!.id,
      subtasks,
    };

    await createTask(payload);
    onClose();
  };

  const SUBTASK_PLACEHOLDERS = [
    "Make coffee",
    "Drink coffee & smile",
    "Learn programming",
    "Smile :)",
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h4" mb={3} mt={{ xs: 2, sm: 0 }}>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          {/* ---------------------------- Title --------------------------- */}
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
          {/* ---------------------------- Title --------------------------- */}
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
                        placeholder={`e.g. ${
                          SUBTASK_PLACEHOLDERS[
                            index % SUBTASK_PLACEHOLDERS.length
                          ]
                        }`}
                        value={controllerField.value.title}
                      />
                    )}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => remove(index)}
                    sx={{ paddingRight: 0 }}
                  >
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
              defaultValue={defaultValues.status}
              rules={{
                required: { value: true, message: "Status can't be blank" },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  sx={{
                    border: `1px solid ${MEDIUM_GREY_COLOR}70`,
                    "& .MuiSelect-icon": {
                      color: MEDIUM_GREY_COLOR,
                    },
                  }}
                >
                  {columns.map((column) => {
                    const { id, name } = column;

                    return (
                      <MenuItem key={id} value={name}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </Stack>
          {/* ---------------------------- Status -------------------------- */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            Create Task
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
