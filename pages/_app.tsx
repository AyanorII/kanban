import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import StoreProvider from "../stores/StoreProvider";
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
