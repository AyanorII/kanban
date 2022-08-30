import { Box } from "@mui/material";
import React from "react";
import { Board } from "../lib/types";
import Header from "./Header/Header";

type Props = {
  children: React.ReactNode;
  currentBoard: Board | null;
  boards: Board[];
  handleCurrentBoardChange: (id: number) => void;
};

const Layout = ({
  children,
  currentBoard,
  boards,
  handleCurrentBoardChange,
}: Props) => {
  return (
    <Box bgcolor="background.dark">
      <Header
        currentBoard={currentBoard}
        boards={boards}
        handleCurrentBoardChange={handleCurrentBoardChange}
      />
      {children}
    </Box>
  );
};

export default Layout;
