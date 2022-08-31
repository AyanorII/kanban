import { Stack } from "@mui/material";
import { Column as IColumn } from "../../lib/types";
import { useTasksQuery } from "../../stores/api/tasksApi";
import TaskCard from "../Tasks/TaskCard";
import ColumnName from "./ColumnName";

type Props = {
  column: IColumn;
};

const Column = ({ column }: Props) => {
  const { name, id: columnId } = column;
  const { data: tasks, isLoading, error } = useTasksQuery(columnId);

  return (
    <Stack gap={2} width="280px">
      {isLoading && !tasks && <div>Loading...</div>}
      {tasks && (
        <>
          <ColumnName name={name.toLowerCase()} tasksNumber={tasks.length} />
          <Stack gap={3}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Column;
