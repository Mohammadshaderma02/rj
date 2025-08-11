import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#1c3781",
    },
    secondary: {
      main: "#20397e",
    },
    error: {
      main: "#cf0072",
    },
    background: {
      default: "transparent",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#000000b2",
    },
    custom: {
      blue: "#3e579c",
      lightBlue: "#6982c7",
      pink: "#cf0072",
      darkBlue: "#1c3781",
      mediumBlue: "#20397e",
    },
  },
  typography: {
    fontFamily: "'Nunito Sans', 'Zain', Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "19px",
      fontWeight: 700,
      fontFamily: "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    h2: {
      fontSize: "23px",
      fontWeight: 700,
      fontFamily: "'Zain-Bold', Helvetica",
      color: "#000000",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    h3: {
      fontSize: "17px",
      fontWeight: 700,
      fontFamily: "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    h4: {
      fontSize: "13px",
      fontWeight: 700,
      fontFamily: "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: "'Nunito Sans-Regular', Helvetica",
      color: "#000000b2",
      letterSpacing: "0",
      lineHeight: "normal",
    },
    body2: {
      fontSize: "16px",
      fontWeight: 500,
      fontFamily: "'Nunito Sans-Medium', Helvetica",
      color: "#000000",
      letterSpacing: "0",
      lineHeight: "normal",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "5px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.h2,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
