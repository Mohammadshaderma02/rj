// src/pages/Main.jsx
import Send from "@mui/icons-material/Send";
import { 
  Box, 
  Button, 
  Paper, 
  Stack, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from "@mui/material";
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import { customerService } from "../services/apiService";
import ZainLogo from "../assets/White logo.svg"

const Main = ({ onDataFetched }) => {
  const { language, toggleLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInquire = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using the test national ID from the API
      const nationalId = "2000264514";
      const response = await customerService.getCustomerLines(nationalId);
      
      if (response.status === 0 && response.data) {
        onDataFetched(response.data);
      } else {
        setError(response.message || getTranslation('error', language));
      }
    } catch (err) {
      setError(err.message || getTranslation('error', language));
    } finally {
      setLoading(false);
    }
  };

  const containerWidth = isMobile ? "100%" : isTablet ? "500px" : "402px";
  const containerHeight = isMobile ? "auto" : "874px";

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "flex-start" : "center",
        padding: isMobile ? "16px" : "0",
        background: 'transparent',
        direction: language === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      <Box
        sx={{
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          maxWidth: "100%",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            position: "relative",
            top: isMobile ? "0" : "18px",
            px: isMobile ? "0" : "16px",
            mb: isMobile ? "20px" : "0",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ 
            position: "relative", 
            width: isMobile ? "120px" : "133.33px", 
            height: "35px" 
          }}>
            <Box
              component="img"
              src={ZainLogo}
              alt="Zain Logo"
              sx={{
                width: isMobile ? "80px" : "93px",
                height: "33px",
                position: "absolute",
                top: 0,
                [language === 'ar' ? 'right' : 'left']: 0,
              }}
            />
          </Box>

          {/* Language Button */}
          <Button
            variant="contained"
            onClick={toggleLanguage}
            sx={{
              height: "34px",
              backgroundColor: "#20397e",
              border: "0.42px solid #6982c7",
              borderRadius: "5px",
              px: isMobile ? "10px" : "15px",
              py: "5px",
              minWidth: "auto",
              fontSize: isMobile ? "11px" : "13px",
              "&:hover": {
                backgroundColor: "#1c3781",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Zain', Arial",
                fontWeight: "bold",
                color: "white",
                fontSize: isMobile ? "11px" : "13px",
              }}
            >
              {getTranslation('languageButton', language)}
            </Typography>
          </Button>
        </Stack>

        {/* Main Content */}
        <Stack
          spacing={2.5}
          sx={{
            width: "100%",
            position: "relative",
            top: isMobile ? "0" : "73px",
            px: isMobile ? "0" : "16px",
            direction: language === 'ar' ? 'rtl' : 'ltr',
          }}
        >
          {/* Info Card */}
          <Paper
            sx={{
              backgroundColor: "#1c3781",
              borderRadius: "8px",
              px: isMobile ? "20px" : "27px",
              py: isMobile ? "20px" : "25px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Zain', Arial",
                fontWeight: "bold",
                fontSize: isMobile ? "16px" : "19px",
                lineHeight: isMobile ? "24px" : "30px",
                color: "white",
                textAlign: language === 'ar' ? 'right' : 'left',
                whiteSpace: 'pre-line',
                direction: language === 'ar' ? 'rtl' : 'ltr',
              }}
            >
              {getTranslation('title', language)}
              {'\n\n'}
              {getTranslation('description', language)}
            </Typography>
          </Paper>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                direction: language === 'ar' ? 'rtl' : 'ltr',
                textAlign: language === 'ar' ? 'right' : 'left',
                '& .MuiAlert-message': {
                  direction: language === 'ar' ? 'rtl' : 'ltr',
                  textAlign: language === 'ar' ? 'right' : 'left',
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Inquire Button */}
          <Button
            variant="contained"
            onClick={handleInquire}
            disabled={loading}
            sx={{
              backgroundColor: "#cf0072",
              borderRadius: "5px",
              px: "15px",
              py: isMobile ? "14px" : "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              direction: language === 'ar' ? 'rtl' : 'ltr',
              "&:hover": {
                backgroundColor: "#b8005f",
              },
              "&:disabled": {
                backgroundColor: "#cf007280",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "'Zain', Arial",
                    fontWeight: "bold",
                    fontSize: isMobile ? "16px" : "18px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {getTranslation('inquireButton', language)}
                </Typography>
                <Send sx={{ 
                  width: "24px", 
                  height: "24px", 
                  color: "white",
                  transform: language === 'ar' ? 'scaleX(-1)' : 'none',
                }} />
              </>
            )}
          </Button>

          {/* Expiry Note */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Zain', Arial",
              fontWeight: "normal",
              fontSize: isMobile ? "16px" : "19px",
              color: "white",
              textAlign: language === 'ar' ? 'right' : 'left',
              px: isMobile ? "10px" : "0",
              direction: language === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            {getTranslation('expireNote', language)}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Main;