import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Column, Subtask, Task } from "../../lib/types";
import { useSubtasksQuery } from "../../stores/api/subtasksApi";
import { RootState } from "../../stores/store";
import { DARK_GREY_COLOR, PRIMARY_COLOR } from "../../styles/theme";
import Modal from "../Modal/Modal";
import TaskInfo from "./TaskInfo";

type Props = {
  task: Task;
  column: Column;
};

const TaskCard = ({ task, column }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title } = task;

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const {
    data: subtasks,
    isLoading,
    error,
  } = useSubtasksQuery(task, {
    skip: !accessToken,
  });

  const completedSubtasks =
    subtasks?.filter((subtask: Subtask) => subtask.completed) || [];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <TaskInfo
          task={task}
          completedSubtasks={completedSubtasks}
        />
      </Modal>
      <StyledCard
        sx={{
          bgcolor: DARK_GREY_COLOR,
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleOpen}
      >
        <CardContent sx={{ padding: 3 }}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={600}
            gutterBottom
            className="task-card__title"
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
      </StyledCard>
    </>
  );
};

export default TaskCard;

const StyledCard = styled(Card)`
  background-color: ${DARK_GREY_COLOR};
  cursor: pointer;

  .task-card__title {
    transition: all 0.15s ease-in-out;
  }

  &:hover {
    .task-card__title {
      color: ${PRIMARY_COLOR};
    }
  }
`;
