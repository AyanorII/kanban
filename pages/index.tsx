import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import { useContext } from "react";
import Column from "../components/Column";
import { BoardContext } from "../lib/context/BoardsContext";

const Home: NextPage = observer(() => {
  const store = useContext(BoardContext);

  if (store.boards.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <Stack flexDirection="row" gap={4}>
      {store.currentBoard?.columns.map((column, index) => {
        return (
          <Column key={index} column={column} />
        );
      })}
    </Stack>
  );
});

export default Home;

const EmptyBoard = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 56px)"
      gap={3}
    >
      <Typography variant="h5" color="text.light" textAlign="center">
        This board is empty. Create a new column to get started.
      </Typography>
      <Button variant="contained" size="large" startIcon={<AddIcon />}>
        Add new column
      </Button>
    </Stack>
  );
};
