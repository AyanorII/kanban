import { Container } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import ColumnsList from "../components/Columns/ColumnsList";
import { useColumnsQuery } from "../stores/api/columnsApi";
import { RootState } from "../stores/store";

const Home: NextPage = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );
  const { data, error, isLoading, isSuccess } = useColumnsQuery(
    currentBoard?.id || skipToken
  );

  return (
    <Container maxWidth={false}>
      <ColumnsList />
    </Container>
  );
};

export default Home;
