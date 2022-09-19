import { Container } from "@mui/material";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import { Board } from "../lib/types";
import { setCurrentBoard } from "../stores/boardsSlice";

type Props = {
  currentBoard: Board;
};

export const getStaticProps: GetStaticProps = async () => {
  const boardsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/boards`;

  const boardsResponse = await axios.get(boardsApiUrl);
  const boards = boardsResponse.data as Board[];
  const firstBoard = boards[0];

  const firstBoardResponse = await axios.get(
    boardsApiUrl + `/${firstBoard.id}`
  );

  const currentBoard = firstBoardResponse.data;

  return {
    props: {
      currentBoard,
    },
  };
};

const Home: NextPage<Props> = ({ currentBoard }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window) {
      const currentBoardInLocalStorage =
        window.localStorage.getItem("currentBoard");

      if (currentBoardInLocalStorage) {
        const parsedCurrentBoard = JSON.parse(currentBoardInLocalStorage);
        dispatch(setCurrentBoard(parsedCurrentBoard));
      } else {
        dispatch(setCurrentBoard(currentBoard));
      }
      return () => {};
    }
  }, []);

  return (
    <Container maxWidth={false}>
      <ColumnsList />
    </Container>
  );
};

export default Home;
