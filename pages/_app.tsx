import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import Head from "../components/Head";
import StoreProvider from "../stores/StoreProvider";
import GlobalStyle from "../styles/GlobalStyle";
import { muiTheme, scTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <StoreProvider>
        <SCThemeProvider theme={scTheme}>
          <MuiThemeProvider theme={muiTheme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </SCThemeProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
