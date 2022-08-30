import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Board } from "../lib/types";
import { setBoards, setCurrentBoard } from "../stores/boardSlice";
import Header from "./Header/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/boards");
      const boards = (await response.data) as Board[];

      dispatch(setBoards(boards));
      dispatch(setCurrentBoard(boards[0]));
    };

    fetchBoards();
  }, []);

  return (
    <Box bgcolor="background.dark">
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
