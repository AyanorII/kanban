import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { useColumnsQuery } from "../../stores/api/columnsApi";
import { RootState } from "../../stores/store";
import AddColumn from "./AddColumn";
import Column from "./Column";

const ColumnsList = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const {
    data: columns,
    isLoading,
    error,
    isError,
  } = useColumnsQuery(currentBoard ?? skipToken);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (columns && columns.length === 0) {
    return <EmptyBoard />;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <Stack flexDirection="row" gap={3} sx={{ position: "relative" }}>
      {columns?.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <AddColumn />
    </Stack>
  );
};

export default ColumnsList;

const AddColumnButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => console.log("Clicked")}
    >
      + Add new column
    </Button>
  );
};

const EmptyBoard = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="85vh">
      <Typography
        variant="h5"
        color="text.secondary"
        textAlign="center"
        marginBottom={3}
      >
        This board is empty. Create a new column to get started.
      </Typography>
      <AddColumnButton />
    </Stack>
  );
};
