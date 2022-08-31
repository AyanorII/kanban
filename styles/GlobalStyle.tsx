import { createGlobalStyle } from "styled-components";
import { ScThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: ScThemeType }>`
  html, body {
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: auto;
    background-color: ${({ theme }) => theme.colors.background.dark};
  }
`;

export default GlobalStyle;
