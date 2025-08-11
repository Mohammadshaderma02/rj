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

const createAppTheme = (language) => {
  const isRtl = language === 'ar';
  
  return createMuiTheme({
    direction: isRtl ? 'rtl' : 'ltr',
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
      fontFamily: isRtl 
        ? "'Zain', 'Arial', sans-serif" 
        : "'Nunito Sans', 'Zain', Helvetica, Arial, sans-serif",
      h1: {
        fontSize: "19px",
        fontWeight: 700,
        fontFamily: isRtl ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
        color: "#ffffff",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
      h2: {
        fontSize: "23px",
        fontWeight: 700,
        fontFamily: isRtl ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
        color: "#000000",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
      h3: {
        fontSize: "17px",
        fontWeight: 700,
        fontFamily: isRtl ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
        color: "#ffffff",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
      h4: {
        fontSize: "13px",
        fontWeight: 700,
        fontFamily: isRtl ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
        color: "#ffffff",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
      body1: {
        fontSize: "16px",
        fontWeight: 400,
        fontFamily: isRtl ? "'Zain', Arial" : "'Nunito Sans-Regular', Helvetica",
        color: "#000000b2",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
      body2: {
        fontSize: "16px",
        fontWeight: 500,
        fontFamily: isRtl ? "'Zain', Arial" : "'Nunito Sans-Medium', Helvetica",
        color: "#000000",
        letterSpacing: "0",
        lineHeight: "normal",
        textAlign: isRtl ? 'right' : 'left',
        direction: isRtl ? 'rtl' : 'ltr',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "5px",
            fontFamily: isRtl ? "'Zain', Arial" : "'Zain-Bold', Helvetica",
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow: "none",
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: ({ theme }) => ({
            ...theme.typography.h2,
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
          }),
          secondary: ({ theme }) => ({
            ...theme.typography.body1,
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            direction: isRtl ? 'rtl' : 'ltr',
            '@media (max-width: 600px)': {
              paddingLeft: '8px',
              paddingRight: '8px',
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
          },
          message: {
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
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
};

export const ThemeProvider = ({ children }) => {
  const { language } = useLanguage();
  const theme = createAppTheme(language);
  const isRtl = language === 'ar';

  // Set document direction
  React.useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    
    // Also set body direction for consistency
    document.body.style.direction = isRtl ? 'rtl' : 'ltr';
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