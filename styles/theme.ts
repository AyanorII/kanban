import { createTheme, responsiveFontSizes } from "@mui/material";

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
      light: DANGER_LIGHT_COLOR,
    },
    background: {
      dark: DARK_BACKGROUND_COLOR,
      light: LIGHT_BACKGROUND_COLOR,
    },
    grey: {
      dark: DARK_GREY_COLOR,
      medium: MEDIUM_GREY_COLOR,
    },
    pitch: {
      white: WHITE_COLOR,
      black: BLACK_COLOR,
    },
    text: {
      primary: LIGHT_BACKGROUND_COLOR,
      secondary: MEDIUM_GREY_COLOR,
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    }
  },
  components: {
    /* ------------------------------- Button ------------------------------- */
    MuiButton: {
      styleOverrides: {
        root: {
          color: WHITE_COLOR,
          fontWeight: 600,
          borderRadius: "24px",
          textTransform: "capitalize",
        },
        containedPrimary: {
          backgroundColor: PRIMARY_COLOR,
          "&:hover": {
            backgroundColor: PRIMARY_LIGHT_COLOR,
          },
        },
        containedSecondary: {
          backgroundColor: WHITE_COLOR,
          color: PRIMARY_COLOR,
          "&:hover": {
            backgroundColor: WHITE_COLOR,
          },
        },
        containedError: {
          backgroundColor: DANGER_COLOR,
          "&:hover": {
            backgroundColor: DANGER_LIGHT_COLOR,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "12px 14px",
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: `${DANGER_COLOR} !important`,
          },
        },
      },
    },
    /* ------------------------------- Button ------------------------------- */
    /* ----------------------------- Text Field ----------------------------- */
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${MEDIUM_GREY_COLOR}70`,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_COLOR,
          },

          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            fontWeight: 600,
          },

          "& .MuiSelect-select.MuiSelect-outlined": {
            fontWeight: 600,
          },

          "& .MuiSelect-icon": {
            color: MEDIUM_GREY_COLOR,
          },
        },
      },
    },
    /* ----------------------------- Text Field ----------------------------- */
    /* ----------------------------- Input Label ---------------------------- */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: WHITE_COLOR,
          fontWeight: 600,
        },
      },
    },
    /* ----------------------------- Input Label ---------------------------- */
    /* ----------------------------- Helper Text ---------------------------- */
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: DANGER_COLOR,
          },
        },
      },
    },
    /* ----------------------------- Helper Text ---------------------------- */
    /* -------------------------------- Paper ------------------------------- */
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: DARK_BACKGROUND_COLOR,

          "& .MuiMenuItem-root": {
            fontWeight: 600,
            color: MEDIUM_GREY_COLOR
          },
        },
      },
    },
    /* -------------------------------- Paper ------------------------------- */
  },
});

muiTheme = responsiveFontSizes(muiTheme);

const scTheme = {
  colors: {
    primary: {
      main: PRIMARY_COLOR,
      light: PRIMARY_LIGHT_COLOR,
    },
    danger: {
      main: DANGER_COLOR,
      light: DANGER_LIGHT_COLOR,
    },
    background: {
      dark: DARK_BACKGROUND_COLOR,
      light: LIGHT_BACKGROUND_COLOR,
    },
    pitch: {
      white: WHITE_COLOR,
      black: BLACK_COLOR,
    },
    grey: {
      dark: DARK_GREY_COLOR,
      medium: MEDIUM_GREY_COLOR,
    },
    text: {
      primary: LIGHT_BACKGROUND_COLOR,
      secondary: MEDIUM_GREY_COLOR,
    },
  },
};

type ScThemeType = typeof scTheme;

export { muiTheme, scTheme, ScThemeType };
