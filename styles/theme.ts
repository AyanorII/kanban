import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material";

/* ------------------------------- Main colors ------------------------------ */
export const PRIMARY_COLOR = "#635FC7";
export const PRIMARY_LIGHT_COLOR = "#A8A4FF";
export const DANGER_COLOR = "#EA5555";
export const DANGER_LIGHT_COLOR = "#FF9898";
/* ------------------------------- Main colors ------------------------------ */
/* ------------------------------ Pitch colors ------------------------------ */
export const WHITE_COLOR = "#FFFFFF";
export const BLACK_COLOR = "#000112";
/* ------------------------------ Pitch colors ------------------------------ */
/* ---------------------------- Background colors --------------------------- */
export const DARK_BACKGROUND_COLOR = "#20212C";
export const LIGHT_BACKGROUND_COLOR = "#F4F7FD";
/* ---------------------------- Background colors --------------------------- */
/* ------------------------------- Grey colors ------------------------------ */
export const DARK_GREY_COLOR = "#2B2C37";
export const MEDIUM_GREY_COLOR = "#828FA3";
/* ------------------------------- Grey colors ------------------------------ */

let muiTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      light: PRIMARY_LIGHT_COLOR,
    },
    danger: {
      main: DANGER_COLOR,
      light: DANGER_LIGHT_COLOR
    },
    background: {
      dark: DARK_BACKGROUND_COLOR,
      light: LIGHT_BACKGROUND_COLOR,
    },
    grey: {
      dark: DARK_GREY_COLOR,
      medium: MEDIUM_GREY_COLOR
    },
    pitch: {
      white: WHITE_COLOR,
      black: BLACK_COLOR
    },
    text: {
      primary: LIGHT_BACKGROUND_COLOR,
      secondary: MEDIUM_GREY_COLOR
    }
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: WHITE_COLOR,
          fontWeight: 600,
          borderRadius: "24px",
          textTransform: "capitalize"
        },
        containedPrimary: {
          backgroundColor: PRIMARY_COLOR,
          ":hover": PRIMARY_LIGHT_COLOR,
        },
        containedSecondary: {
          backgroundColor: "#1efeffa",
          ":hover": "#d8d7f3",
        },
        containedError: {
          backgroundColor: DANGER_COLOR,
          ":hover": DANGER_LIGHT_COLOR,
        }
      }
    }
  }
});


muiTheme = responsiveFontSizes(muiTheme)

const scTheme = {
  colors: {
    primary: {
      main: PRIMARY_COLOR,
      light: PRIMARY_LIGHT_COLOR,
    },
    danger: {
      main: DANGER_COLOR,
      light: DANGER_LIGHT_COLOR
    },
    background: {
      dark: DARK_BACKGROUND_COLOR,
      light: LIGHT_BACKGROUND_COLOR,
    },
    pitch: {
      white: WHITE_COLOR,
      black: BLACK_COLOR
    },
    grey: {
      dark: DARK_GREY_COLOR,
      medium: MEDIUM_GREY_COLOR
    },
    text: {
      primary: LIGHT_BACKGROUND_COLOR,
      secondary: MEDIUM_GREY_COLOR
    }
  }
}

type ScThemeType = typeof scTheme;

export {muiTheme, scTheme, ScThemeType}
