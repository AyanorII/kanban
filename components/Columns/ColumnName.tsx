import { Box, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  tasksNumber: number;
};

const ColumnName = ({ name, tasksNumber }: Props) => {
  const randomHexColor = () => {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + ("000000" + hex).slice(-6);
  };

  const randomColor = randomHexColor();

  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <Box
        borderRadius="50%"
        bgcolor={randomColor}
        sx={{ width: "15px", height: "15px" }}
      />
      <Typography variant="h6" color="text.secondary" textTransform="uppercase">
        {name} ({tasksNumber})
      </Typography>
    </Stack>
  );
};

export default ColumnName;
