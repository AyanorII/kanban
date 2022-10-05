import { Stack } from "@mui/material";
import { Column as IColumn } from "../../lib/types";
import { useTasksQuery } from "../../stores/api/tasksApi";
import TaskCard from "../Tasks/TaskCard";
import ColumnName from "./ColumnName";
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store';

type Props = {
  column: IColumn;
};

export const COLUMN_WIDTH = "280px";

const Column = ({ column }: Props) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  const { data: tasks, isLoading, error } = useTasksQuery(column, {
    skip: !accessToken
  });

  return (
    <Stack gap={2} width={COLUMN_WIDTH}>
      {isLoading && !tasks && <div>Loading...</div>}
      {tasks && (
        <>
          <ColumnName
            name={column.name.toLowerCase()}
            color={column.color}
            tasksNumber={tasks.length}
          />
          <Stack gap={3}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} column={column}/>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Column;
