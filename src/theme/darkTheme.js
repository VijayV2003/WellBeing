import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const darkTheme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "#81e6d9",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 800,
      letterSpacing: "-0.01em",
      color: "#4fd1c5",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "#38b2ac",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#f7fafc",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#e2e8f0",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      color: "#cbd5e0",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#e2e8f0",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#a0aec0",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    }
  },
  palette: {
    primary: {
      main: "#319795",
      light: "#4fd1c5",
      dark: "#2c7a7b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: green[400],
      light: green[200],
      dark: green[600],
      contrastText: "#1a202c",
    },
    text: {
      primary: "#f7fafc",
      secondary: "#cbd5e0",
    },
    mode: "dark",
    background: {
      default: "#0f172a", // Deep professional slate
      paper: "#1e293b",   // Elevated slate
      box: "#1e293b",
    },
    error: {
      main: "#fc8181",
      light: "#feb2b2",
      dark: "#e53e3e",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          padding: "8px 24px",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(49, 151, 149, 0.25)",
          },
        },
        containedPrimary: {
          backgroundColor: "#319795",
          "&:hover": {
            backgroundColor: "#2c7a7b",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.03)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "16px",
        },
      },
    },
  },
});

export default darkTheme;
