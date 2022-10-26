import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
            />
          </MuiThemeProvider>
        </SCThemeProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
