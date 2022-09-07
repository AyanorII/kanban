import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import StoreProvider from "../stores/StoreProvider";
import GlobalStyle from "../styles/GlobalStyle";
import { muiTheme, scTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <StoreProvider>
        <SCThemeProvider theme={scTheme}>
          <MuiThemeProvider theme={muiTheme}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MuiThemeProvider>
        </SCThemeProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
