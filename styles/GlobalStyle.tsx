import { createGlobalStyle } from "styled-components";
import { ScThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: ScThemeType }>`
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
    background-color: ${({ theme }) => theme.colors.background.dark};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
