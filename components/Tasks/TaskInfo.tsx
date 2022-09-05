import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  Checkbox as MuiCheckbox,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Column, Subtask, Task } from "../../lib/types";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import {
  useSubtasksQuery,
  useUpdateSubtaskMutation,
} from "../../stores/api/subtasksApi";
import { useUpdateTaskMutation } from "../../stores/api/tasksApi";
import { RootState } from "../../stores/store";
import { DARK_BACKGROUND_COLOR, PRIMARY_COLOR } from "../../styles/theme";

type Props = {
  task: Task;
  completedSubtasks: Subtask[];
};

const TaskInfo = ({ task, completedSubtasks }: Props) => {
  const { title, description } = task;

  const { data: subtasks, isLoading, error } = useSubtasksQuery(task);
  const [updateTask] = useUpdateTaskMutation();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const { data: currentBoardColumns } = useBoardColumnsQuery(
    currentBoard || skipToken
  );

  const currentStatus = currentBoardColumns?.find(
    (column) => column.id === task.column_id
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <IconButton>
          <MoreVertIcon sx={{ color: "text.secondary" }} />
        </IconButton>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        letterSpacing="0.6px"
        lineHeight={2}
        mb={2}
      >
        {description}
      </Typography>
      <Stack gap={3}>
        {subtasks && (
          <div>
            <Typography variant="body1" mb={2} fontWeight={600}>
              Subtasks ({completedSubtasks.length} of {subtasks.length})
            </Typography>
            <Stack gap={1.5}>
              {/* Created a copy of subtasks to be able to sort it. Redux doesn't allow to mutate the state. */}
              {[...subtasks]
                .sort((a, b) => a.id - b.id)
                .map((subtask) => (
                  <Checkbox
                    key={subtask.id}
                    subtask={subtask}
                    subtasks={subtasks}
                    completedSubtasks={completedSubtasks}
                  />
                ))}
            </Stack>
          </div>
        )}
        <Stack gap={2}>
          <InputLabel>Current Status</InputLabel>
          <TextField
            onChange={async (e) => {
              const newStatus = e.target.value;
              const response = await updateTask({
                ...task,
                status: newStatus,
              });
              console.log(response);
            }}
            select
            fullWidth
            defaultValue={currentStatus?.name}
          >
            {currentBoardColumns?.map((column: Column) => {
              const { id, name } = column;

              return (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
      </Stack>
    </>
  );
};

export default TaskInfo;

type CheckboxProps = {
  subtask: Subtask;
  subtasks: Subtask[];
  completedSubtasks: Subtask[];
};

const Checkbox = ({ subtask, subtasks }: CheckboxProps) => {
  const { completed, title } = subtask;
  const [checked, setChecked] = useState(completed);

  const [updateSubtask] = useUpdateSubtaskMutation();

  const handleClick = async () => {
    setChecked(!checked);

    try {
      await updateSubtask({
        ...subtask,
        completed: !checked,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  return (
    <Card sx={{ bgcolor: DARK_BACKGROUND_COLOR }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={1}
        p={1}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: `${PRIMARY_COLOR}80`,
          },
        }}
      >
        <MuiCheckbox checked={checked} sx={{ color: "white" }} />
        <Typography
          variant="body1"
          color={checked ? "text.secondary" : "text.primary"}
          fontWeight={600}
          mb={0}
          letterSpacing="0.5px"
          sx={{ textDecoration: checked ? "line-through" : "none" }}
        >
          {title}
        </Typography>
      </Stack>
    </Card>
  );
};
