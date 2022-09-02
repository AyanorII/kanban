import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  Checkbox as MuiCheckbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Subtask, Task } from "../../lib/types";
import {
  useSubtasksQuery,
  useUpdateSubtaskMutation,
} from "../../stores/api/subtasksApi";
import { DARK_BACKGROUND_COLOR } from "../../styles/theme";
import Modal from "../Modal";

type Props = {
  task: Task;
  open: boolean;
  completedSubtasks: Subtask[];
  handleClose: () => void;
};

const TaskInfo = ({ task, open, handleClose, completedSubtasks }: Props) => {
  const { title, description } = task;

  const { data: subtasks, isLoading, error } = useSubtasksQuery(task);

  return (
    <Modal open={open} onClose={handleClose}>
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
      {subtasks && (
        <>
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
        </>
      )}
    </Modal>
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
