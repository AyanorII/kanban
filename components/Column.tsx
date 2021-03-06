import { Box, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useTasks } from "../lib/hooks";
import { Column as ColumnInterface } from "../lib/types";
import Task from "./Task";

type Props = {
  column: ColumnInterface;
};

const Column = observer(({ column }: Props) => {
  const { name, id } = column;

  const { tasks } = useTasks(id);

  return (
    <Stack gap={3} width="280px" minWidth="280px">
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <RandomColorDot />
        <Typography
          variant="h6"
          component="h2"
          fontWeight={500}
          textTransform="uppercase"
          color="text.light"
        >
          {name}
        </Typography>
      </Stack>
      {tasks.map((task, index) => {
        return <Task key={index} task={task} />;
      })}
    </Stack>
  );
});

export default Column;

const RandomColorDot = () => {
  // Returns a random HEX color
  const getRandomColor = (): string => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomHex}`;
  };

  return (
    <Box
      borderRadius="50%"
      width="15px"
      height="15px"
      bgcolor={getRandomColor()}
    />
  );
};
