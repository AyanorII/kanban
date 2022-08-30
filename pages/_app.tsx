import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/Layout";
import { Board } from "../lib/types";
import StoreProvider from "../stores/StoreProvider";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
