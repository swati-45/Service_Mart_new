import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const getMuiTheme = () =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: colors.primary,
        dark: colors.primaryDark,
        light: colors.primaryLight,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      error: {
        main: colors.danger,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      divider: colors.border,
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 700,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            fontWeight: 500,
            padding: "10px 24px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          },
        },
      },
    },
  });
