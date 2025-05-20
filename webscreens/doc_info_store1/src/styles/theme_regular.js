// theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const basePalette = {
  primary: {
    main: "#6366F1", // Indigo 500
    light: "#A5B4FC",
    dark: "#4338CA",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#F472B6", // Pink 400
    light: "#FBCFE8",
    dark: "#BE185D",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#EF4444", // Red 500
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F59E0B", // Amber 500
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0EA5E9", // Sky 500
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#10B981", // Emerald 500
    contrastText: "#FFFFFF",
  },
};

const lightTheme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: "linear-gradient(45deg, #4338CA 30%, #6366F1 90%)",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 48,
            padding: "0 30px",
          },
        },
      },
    },
    palette: {
      mode: "light",
      ...basePalette,
      background: {
        default: "#F9FAFB", // light gray
        paper: "#FFFFFF",
      },
      text: {
        primary: "#111827", // gray-900
        secondary: "#6B7280", // gray-500
      },
    },
  }),
);

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      ...basePalette,
      background: {
        default: "#111827", // gray-900
        paper: "#1F2937", // gray-800
      },
      text: {
        primary: "#F9FAFB",
        secondary: "#9CA3AF",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              border: 0,
              borderRadius: 3,
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              color: "white",
              height: 48,
              padding: "0 30px",
            },
          },
        },
      },
    },
  }),
);

export { lightTheme, darkTheme };
