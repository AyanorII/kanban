import AddIcon from "@mui/icons-material/Add";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import { useContext } from "react";
import Column from "../components/Column";
import { RootContext } from "../lib/context/StoreContext";

const Home: NextPage = observer(() => {
  const store = useContext(RootContext);
  const { boards, currentBoard } = store.board;

  if (boards.length === 0) {
    return <EmptyBoard />;
  }

  const cardStyles = {
    width: "280px",
    minWidth: "280px",
    marginTop: 7,
    borderRadius: 3,
    cursor: "pointer",
  };

  return (
    <Stack flexDirection="row" gap={4}>
      {currentBoard.columns.map((column, index) => {
        return <Column key={index} column={column} />;
      })}
      <Card sx={cardStyles}>
        <CardContent>
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            <AddIcon sx={{ color: "text.light" }} />
            <Typography variant="h6" color="text.light">
              New Column
            </Typography>
          </Stack>
        </CardContent>
      </Card>
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
