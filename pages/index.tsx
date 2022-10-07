import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import AddEditBoardModal from "../components/Header/AddEditBoardModal";
import Layout from "../components/Layout";
import { useBoardsQuery } from "../stores/api/boardsApi";
import { setCurrentBoard } from "../stores/boardsSlice";
import { RootState } from "../stores/store";
import { setAccessToken } from "../stores/userSlice";
import { PRIMARY_COLOR } from "../styles/theme";
import Loading from '../components/Loading';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );
  const router = useRouter();

  const { data: boards } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (window) {
      const tokenInLocalStorage = window.localStorage.getItem("accessToken");

      if (tokenInLocalStorage && !accessToken) {
        dispatch(setAccessToken(tokenInLocalStorage));
      } else if (!tokenInLocalStorage && !accessToken) {
        router.push("login");
      }

      const currentBoardInLocalStorage =
        window.localStorage.getItem("currentBoard");

      if (currentBoardInLocalStorage && !currentBoard) {
        const parsedCurrentBoard =
          currentBoardInLocalStorage === "undefined"
            ? null
            : JSON.parse(currentBoardInLocalStorage);

        if (parsedCurrentBoard) {
          dispatch(setCurrentBoard(parsedCurrentBoard));
        }
      } else if (!currentBoardInLocalStorage && boards) {
        if (boards.length >= 1) {
          dispatch(setCurrentBoard(boards[0]));
          window.localStorage.setItem(
            "currentBoard",
            JSON.stringify(boards[0])
          );
        }
      }
    }
  }, [accessToken, boards]);

  return isLoading || !accessToken ? (
    <Loading />
  ) : (
    <Layout>
      <Container maxWidth={false}>
        {currentBoard ? (
          <ColumnsList />
        ) : (
          !currentBoard && boards?.length === 0 && <NoBoards />
        )}
      </Container>
    </Layout>
  );
};

export default Home;

const NoBoards = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddEditBoardModal open={open} onClose={handleClose} />
      <Stack
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 130px)"
        gap={3}
      >
        <Typography variant="h4" color="text.secondary">
          No boards yet :(
        </Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
        >
          Create a board
        </Button>
      </Stack>
    </>
  );
};
