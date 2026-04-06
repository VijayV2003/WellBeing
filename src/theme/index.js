import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "#00564d",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 800,
      letterSpacing: "-0.01em",
      color: "#00766a",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "#008579",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#1a202c",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
      letterSpacing: "0em",
      color: "#2d3748",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      color: "#4a5568",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#4a5568",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#718096",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    }
  },
  palette: {
    primary: {
      main: "#008579",
      light: "#339d93",
      dark: "#005d54",
      contrastText: "#ffffff",
    },
    secondary: {
      main: green[600],
      light: green[400],
      dark: green[800],
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
    },
    mode: "light",
    background: {
      default: "#F8FAFC",
      paper: "#ffffff",
      box: "#ffffff",
    },
    error: {
      main: "#e53e3e",
      light: "#fc8181",
      dark: "#c53030",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px", // Pill-shaped buttons by default
          padding: "8px 24px",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 133, 121, 0.15)",
          },
        },
        containedPrimary: {
          backgroundColor: "#008579",
          "&:hover": {
            backgroundColor: "#006b61",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.03)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
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

export default theme;
