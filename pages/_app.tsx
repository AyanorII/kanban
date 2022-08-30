import { ThemeProvider } from "@mui/material";
import axios from "axios";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Board } from "../lib/types";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const handleCurrentBoardChange = (id: number) => {
    const board = boards.find((b) => b.id === id);
    if (board) {
      setCurrentBoard(board);
    }
  }

  useEffect(() => {
    const getBoards = async () => {
      const urlEndpoint = process.env.API_URL + "/boards";
      const response = await axios.get("http://localhost:8080/api/v1/boards");
      const data = await response.data

      setBoards(data);
      setCurrentBoard(data[0]);
    };

    getBoards();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout
        currentBoard={currentBoard}
        boards={boards}
        handleCurrentBoardChange={handleCurrentBoardChange}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
