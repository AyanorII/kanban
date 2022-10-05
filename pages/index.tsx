import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import Layout from "../components/Layout";
import { useBoardsQuery } from "../stores/api/boardsApi";
import { setCurrentBoard } from "../stores/boardsSlice";
import { RootState } from "../stores/store";
import { setAccessToken } from "../stores/userSlice";
import { PRIMARY_COLOR } from "../styles/theme";

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
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Triangle
        height="50vh"
        width="50vw"
        color={PRIMARY_COLOR}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </Stack>
  ) : (
    <Layout>
      <Container maxWidth={false}>{currentBoard && <ColumnsList />}</Container>
    </Layout>
  );
};

export default Home;
