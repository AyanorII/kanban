import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { Subtask, Task } from "../../lib/types";
import { useSubtasksQuery } from "../../stores/api/subtasksApi";
import { DARK_GREY_COLOR } from "../../styles/theme";
import TaskInfo from "./TaskInfo";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title } = task;
  const { data: subtasks, isLoading, error } = useSubtasksQuery(task);

  const completedSubtasks =
    subtasks?.filter((subtask: Subtask) => subtask.completed) || [];

  return (
    <Card
      sx={{ bgcolor: DARK_GREY_COLOR, cursor: "pointer" }}
      onClick={handleOpen}
    >
      <TaskInfo
        task={task}
        completedSubtasks={completedSubtasks}
        open={open}
        handleClose={handleClose}
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="body1"
          color="text.primary"
          fontWeight={600}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          marginBottom={0}
          fontWeight={600}
          color="text.secondary"
        >
          {!subtasks && isLoading && "Loading..."}
          {subtasks &&
            `${completedSubtasks.length} of ${subtasks.length} ${
              subtasks!.length === 1 ? "subtask" : "subtasks"
            } completed`}
          {error && "Error :("}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
