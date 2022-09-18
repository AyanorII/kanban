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

import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ModalType, Task, TaskPayload } from "../../lib/types";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import {
  useDeleteSubtaskMutation,
  useSubtasksQuery,
} from "../../stores/api/subtasksApi";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../stores/api/tasksApi";
import { RootState } from "../../stores/store";
import { MEDIUM_GREY_COLOR } from "../../styles/theme";
import Input from "../Input";
import Modal from "../Modal";

type Props = {
  task?: Task;
} & ModalType;

const AddEditTaskModal = ({ open, onClose, task }: Props) => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const { data: columns, isLoading: areColumnsLoading } = useBoardColumnsQuery(
    currentBoard || skipToken
  );
  const { data: subtasks } = useSubtasksQuery(task || skipToken);

  const hasColumns = !areColumnsLoading && columns && columns.length > 1;

  const defaultValues: TaskPayload = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "",
    columnId: task?.columnId || (hasColumns && columns[0].id) || 1,
    subtasks,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  const handleRemoveSubtask = (index: number) => {
    const subtaskId = getValues(`subtasks.${index}`)?.id;
    if (subtaskId) {
      deleteSubtask(subtaskId);
      remove(index);
    }
  };

  const onSubmit = async (data: TaskPayload) => {
    const isEditingTask = Boolean(task);
    const { status } = data;
    const column = columns!.find((column) => column.name === status);

    let subtasks: any = data.subtasks;

    if (isEditingTask) {
      subtasks = data.subtasks?.map((subtask) =>
        typeof subtask === "string" ? { title: subtask } : subtask
      );
    }

    const payload: TaskPayload = {
      ...data,
      columnId: column?.id || columns![0].id,
      subtasks,
      id: task?.id || undefined,
    };

    const response = isEditingTask
      ? await updateTask(payload)
      : await createTask(payload);

    reset();
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
        {task ? "Edit Task" : "Add New Task"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          {/* ---------------------------- Title ---------------------------  */}
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
            {fields.map((field, index) => (
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
                      onChange={(e) => {
                        setValue(`subtasks.${index}`, {
                          ...getValues(`subtasks.${index}`),
                          title: e.target.value,
                        });
                      }}
                      value={controllerField.value.title}
                    />
                  )}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveSubtask(index)}
                  sx={{ paddingRight: 0 }}
                >
                  <CloseIcon sx={{ color: MEDIUM_GREY_COLOR }} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              append({
                title: "",
                id: undefined,
                taskId: task?.id,
              })
            }
          >
            + Add New Subtask
          </Button>
          {/* --------------------------- Subtasks ------------------------- */}
          {/* ---------------------------- Status -------------------------- */}
          <Stack gap={1}>
            <InputLabel>Status</InputLabel>
            {!areColumnsLoading && (
              <Controller
                control={control}
                name="status"
                defaultValue={defaultValues.status}
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
                    {columns?.map((column) => {
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
            )}
          </Stack>
          {/* ---------------------------- Status -------------------------- */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            {task ? "Edit Task" : "Create Task"}
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddEditTaskModal;
