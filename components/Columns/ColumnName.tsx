import { Box, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  tasksNumber: number;
  color: string;
};

const ColumnName = ({ name, tasksNumber, color }: Props) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <Box
        borderRadius="50%"
      bgcolor={color}
        sx={{ width: "15px", height: "15px" }}
      />
      <Typography variant="h6" color="text.secondary" textTransform="uppercase">
        {name} ({tasksNumber})
      </Typography>
    </Stack>
  );
};

export default ColumnName;
