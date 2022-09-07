import { Container } from "@mui/material";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import { Board, Column } from "../lib/types";
import { setCurrentBoard, setCurrentBoardColumn } from "../stores/boardsSlice";

type Props = {
  boards: Board[];
  columns: Column[];
};

export const getStaticProps: GetStaticProps = async () => {
  const boardsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/boards`
  );
  const boards = boardsResponse.data;

  const columnsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/boards/${boards[0].id}/columns`
  );
  const columns = columnsResponse.data;

  return {
    props: {
      boards,
      columns,
    },
  };
};

const Home: NextPage<Props> = ({ boards, columns }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window) {
      const currentBoardInLocalStorage =
        window.localStorage.getItem("currentBoard");
      const columnsInLocalStorage = window.localStorage.getItem("columns");

      if (currentBoardInLocalStorage && columnsInLocalStorage) {
        const parsedCurrentBoard = JSON.parse(currentBoardInLocalStorage);
        const parsedColumns = JSON.parse(columnsInLocalStorage);

        dispatch(setCurrentBoard(parsedCurrentBoard));
        dispatch(setCurrentBoardColumn(parsedColumns));
      } else {
        dispatch(setCurrentBoard(boards[0]));
        dispatch(setCurrentBoardColumn(columns));

        window.localStorage.setItem("currentBoard", JSON.stringify(boards[0]));
        window.localStorage.setItem("columns", JSON.stringify(columns));
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
