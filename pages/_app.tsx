import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import BoardsContext from "../lib/context/StoreContext";
import "../styles/globals.css";
import getDesignTokens from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  let theme = useMemo(
    () => createTheme(getDesignTokens(mode) as ThemeOptions),
    [prefersDarkMode, mode]
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
