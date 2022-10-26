import { Stack } from "@mui/material";
import { LineWave } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Column as IColumn } from "../../lib/types";
import { useTasksQuery } from "../../stores/api/tasksApi";
import { RootState } from "../../stores/store";
import TaskCard from "../Tasks/TaskCard";
import ColumnName from './ColumnName';
import { PRIMARY_COLOR } from '../../styles/theme';

type Props = {
  column: IColumn;
};

export const COLUMN_WIDTH = "280px";

const Column = ({ column }: Props) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const {
    data: tasks,
    isLoading,
    error,
  } = useTasksQuery(column, {
    skip: !accessToken,
  });

  return (
    <>
      {isLoading && !tasks && (
        <LineWave
          height="100%"
          width="100%"
          color={PRIMARY_COLOR}
          ariaLabel="line-wave"
          wrapperStyle={{}}
          visible={isLoading}
        />
      )}
      <Stack gap={2} width={COLUMN_WIDTH}>
        {tasks && (
          <>
            <ColumnName
              name={column.name.toLowerCase()}
              color={column.color}
              tasksNumber={tasks.length}
            />
            <Stack gap={3}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} column={column} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Column;
