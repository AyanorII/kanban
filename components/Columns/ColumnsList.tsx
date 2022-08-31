import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { Column as IColumn } from "../../lib/types";
import { useColumnsQuery } from "../../stores/api/columnsApi";
import { RootState } from "../../stores/store";
import Column from "./Column";

const ColumnsList = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const {
    data: columns,
    isLoading,
    error,
  } = useColumnsQuery(currentBoard?.id || skipToken);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (columns && columns.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <Stack flexDirection="row" gap={3}>
      {columns?.map((column: IColumn) => (
        <Column key={column.id} column={column} />
      ))}
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
        fontWeight={600}
        textAlign="center"
        marginBottom={3}
      >
        This board is empty. Create a new column to get started.
      </Typography>
      <AddColumnButton />
    </Stack>
  );
};
