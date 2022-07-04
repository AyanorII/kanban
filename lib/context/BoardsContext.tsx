import React, { createContext } from "react";
import Board, { store } from "./board";

type Props = {
  children: React.ReactNode;
};

export const BoardContext = createContext(store);

const BoardsContext = ({ children }: Props) => {
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export default BoardsContext;
