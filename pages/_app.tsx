import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import BoardsContext from "../lib/context/BoardsContext";
import "../styles/globals.css";
import getDesignTokens from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  let theme = useMemo(
    () => createTheme(getDesignTokens(mode) as ThemeOptions),
    [mode]
  );
  theme = responsiveFontSizes(theme);

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <ThemeProvider theme={theme}>
      <BoardsContext>
        <CssBaseline />
        <Layout isDarkMode={mode === "dark"} toggleTheme={toggleTheme}>
          <Component {...pageProps} />
        </Layout>
      </BoardsContext>
    </ThemeProvider>
  );
}

export default MyApp;
