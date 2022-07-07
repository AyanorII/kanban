import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useSubtasks } from "../lib/hooks";
import { Task as TaskInterface } from "../lib/types";

type Props = {
  task: TaskInterface;
};

const Task = observer(({ task }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { title, id } = task;

  const { subtasks, completedSubtasks } = useSubtasks(id);

  const cardStyles = {
    bgcolor: "background.paper",
    borderRadius: 3,
    padding: 1,
    width: "100%",
    cursor: "pointer",
  };

  return (
    <>
      <TaskDetailsModal task={task} open={open} handleClose={handleClose} />
      <Card onClick={handleOpen} sx={cardStyles}>
        <CardContent>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.main"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.light" fontWeight={600}>
            ({completedSubtasks.length} of {subtasks.length})
          </Typography>
        </CardContent>
      </Card>
    </>
  );
});

export default Task;

type TaskDetailsModalProps = {
  task: TaskInterface;
  open: boolean;
  handleClose: () => void;
};

const TaskDetailsModal = observer(
  ({ task, open, handleClose }: TaskDetailsModalProps) => {
    const { title, description } = task;

    const cardContentStyles = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      borderRadius: 3,
      p: 3,
      maxWidth: "90%",
    };

    return (
      <Modal open={open} onClose={handleClose}>
        <Card sx={{ display: "grid", placeItems: "center" }}>
          <CardContent sx={cardContentStyles}>
            <Stack
              flexDirection="row"
              gap={3}
              justifyContent="space-between"
              alignItems="center"
              marginBottom={1}
            >
              <Typography variant="h6" color="text.main">
                {title}
              </Typography>
              <IconButton>
                <MoreVertIcon sx={{ color: "text.light" }} />
              </IconButton>
            </Stack>
            <Typography paragraph color="text.light">
              {description}
            </Typography>
            <SubTasks task={task} />
          </CardContent>
        </Card>
      </Modal>
    );
  }
);

type SubTasksProps = {
  task: TaskInterface;
};

const SubTasks = observer(({ task }: SubTasksProps) => {
  const { subtasks, completedSubtasks, isLoading } = useSubtasks(task.id);

  return (
    <Stack>
      <Typography variant="body1" fontWeight={600} color="text.main">
        <>
          {isLoading && <Skeleton variant="text" />}
          {!isLoading &&
            `Subtasks (${completedSubtasks.length} of ${subtasks.length})`}
        </>
      </Typography>
      <List>
        {subtasks.map((subtask, index) => {
          const { title, completed } = subtask;

          return (
            <ListItem key={index} sx={{ padding: 0 }}>
              <Stack flexDirection="row" alignItems="center">
                <Checkbox checked={completed} sx={{ paddingLeft: 0 }} />
                <Typography variant="body2" color="text.main" fontWeight={600}>
                  {title}
                </Typography>
              </Stack>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
});
