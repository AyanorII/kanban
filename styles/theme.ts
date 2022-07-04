import { PaletteMode } from "@mui/material";

/* ----------------------------- Primary colors ----------------------------- */
export const PRIMARY_MAIN = "#635FC7";
export const PRIMARY_LIGHT = "#A8A4FF";
export const PRIMARY_DARK = "#2C2B6E";
/* ------------------------------ Error colors ------------------------------ */
export const ERROR_MAIN = "#EA5555";
export const ERROR_LIGHT = "#FF9898";
export const ERROR_DARK = "#9C0000";
/* ------------------------------ Error colors ------------------------------ */
/* ------------------------------- Body colors ------------------------------ */
export const BODY_DARK = "#20212c";
export const BODY_LIGHT = "#f5f7fd";
/* ------------------------------- Body colors ------------------------------ */
/* ---------------------------- Background colors --------------------------- */
export const BACKGROUND_DARK = "#2b2c37";
export const BACKGROUND_LIGHT = "#FFF";
/* ---------------------------- Background colors --------------------------- */

const baseButtonStyles = {
  root: {
    borderRadius: "24px",
    textTransform: "capitalize",
    color: "#FFF",
    fontWeight: 600,
  },
  containedPrimary: {
    "&:hover": {
      backgroundColor: PRIMARY_LIGHT,
    },
  },
};

const basePaletteStyles = {
  primary: {
    main: PRIMARY_MAIN,
    light: PRIMARY_LIGHT,
    dark: PRIMARY_DARK,
    contrastText: "#fff",
  },
  error: {
    main: ERROR_MAIN,
    light: ERROR_LIGHT,
    dark: ERROR_DARK,
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  mode,
  ...(mode === "light"
    ? {
        palette: {
          ...basePaletteStyles,
          background: {
            default: BACKGROUND_LIGHT,
            paper: BACKGROUND_LIGHT,
          },
          text: {
            main: "#000112",
            light: "#828FA3",
          },
          body: {
            background: BODY_LIGHT,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              ...baseButtonStyles,
              containedSecondary: {
                backgroundColor: `${PRIMARY_MAIN}10`,
                color: PRIMARY_MAIN,
                "&:hover": {
                  backgroundColor: `${PRIMARY_MAIN}35`,
                },
              },
            },
          },
        },
      }
    : {
        palette: {
          ...basePaletteStyles,
          background: {
            default: BACKGROUND_DARK,
            paper: BACKGROUND_DARK,
          },
          text: {
            main: "#FFF",
            light: "#828FA3",
          },
          body: {
            background: BODY_DARK,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              ...baseButtonStyles,
              containedSecondary: {
                backgroundColor: `#FFF`,
                color: PRIMARY_MAIN,
                "&:hover": {
                  backgroundColor: `#FFF`,
                },
              },
            },
          },
        },
      }),
});

export default getDesignTokens;
