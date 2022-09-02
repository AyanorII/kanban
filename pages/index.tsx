import { Container } from "@mui/material";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import { Board } from "../lib/types";
import { setCurrentBoard } from "../stores/boardsSlice";

type Props = {
  boards: Board[];
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://localhost:8080/api/v1/boards");
  const boards = response.data;

  return {
    props: {
      boards,
    },
  };
};

const Home: NextPage<Props> = ({ boards }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window) {
      const currentBoardInLocalStorage =
        window.localStorage.getItem("currentBoard");

      if (currentBoardInLocalStorage) {
        const parsedCurrentBoard = JSON.parse(currentBoardInLocalStorage);
        dispatch(setCurrentBoard(parsedCurrentBoard));
      } else {
        dispatch(setCurrentBoard(boards[0]));
        window.localStorage.setItem("currentBoard", JSON.stringify(boards[0]));
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
