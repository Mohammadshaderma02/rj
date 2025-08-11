// src/components/ThemeProvider.jsx
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import React from "react";
import { useLanguage } from '../contexts/LanguageContext';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

const createAppTheme = (language) => createMuiTheme({
  direction: language === 'ar' ? 'rtl' : 'ltr',
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
    fontFamily: language === 'ar' 
      ? "'Zain', 'Arial', sans-serif" 
      : "'Nunito Sans', 'Zain', Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "19px",
      fontWeight: 700,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    h2: {
      fontSize: "23px",
      fontWeight: 700,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
      color: "#000000",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    h3: {
      fontSize: "17px",
      fontWeight: 700,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    h4: {
      fontSize: "13px",
      fontWeight: 700,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
      color: "#ffffff",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Nunito Sans-Regular', Helvetica",
      color: "#000000b2",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    body2: {
      fontSize: "16px",
      fontWeight: 500,
      fontFamily: language === 'ar' ? "'Zain', Arial" : "'Nunito Sans-Medium', Helvetica",
      color: "#000000",
      letterSpacing: "0",
      lineHeight: "normal",
      textAlign: language === 'ar' ? 'right' : 'left',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "5px",
          fontFamily: language === 'ar' ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
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
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const { language } = useLanguage();
  const theme = createAppTheme(language);
  const isRtl = language === 'ar';

  // Set document direction
  React.useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', language);
  }, [isRtl, language]);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};