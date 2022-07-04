import { Card, CardContent, Typography } from "@mui/material";
import { Task } from "../lib/types";

type Props = {
  task: Task;
};

const Task = ({ task }: Props) => {
  const { title, description, subtasks } = task;

  const numCompletedSubtasks: number = subtasks.reduce(
    (acc, curr) => acc + (curr.isCompleted ? 1 : 0),
    0
  );

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        padding: 1,
        width: "100%",
      }}
    >
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
          {numCompletedSubtasks} of {subtasks.length} subtasks
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
