import { createGlobalStyle } from "styled-components";
import { DARK_BACKGROUND_COLOR } from "./theme";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Plus Jakarta Sans", sans-serif
  }

  html, body {
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: auto;
    background-color: ${DARK_BACKGROUND_COLOR};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
