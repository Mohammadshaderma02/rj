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
import SendIcon from "../assets/send.svg"

const Main = ({ onDataFetched }) => {
  const { language, toggleLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isRtl = language === 'ar';

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
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <Box
        sx={{
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          maxWidth: "100%",
          direction: isRtl ? 'rtl' : 'ltr',
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
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {/* Logo Section */}
          <Box sx={{ 
            position: "relative", 
            width: isMobile ? "120px" : "133.33px", 
            height: "35px",
            order: isRtl ? 2 : 1,
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
                [isRtl ? 'right' : 'left']: 0,
              }}
            />
          </Box>

          {/* Language Button */}
          <Button
            variant="contained"
            onClick={toggleLanguage}
            className="language-button"
            sx={{
              height: "34px",
              backgroundColor: "#20397e",
              border: "0.42px solid #6982c7",
              borderRadius: "5px",
              px: isMobile ? "10px" : "15px",
              py: "5px",
              minWidth: "auto",
              fontSize: isMobile ? "11px" : "13px",
              order: isRtl ? 1 : 2,
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
                direction: isRtl ? 'rtl' : 'ltr',
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
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {/* Info Card */}
          <Paper
            sx={{
              backgroundColor: "#1c3781",
              borderRadius: "8px",
              px: isMobile ? "20px" : "27px",
              py: isMobile ? "20px" : "25px",
              direction: isRtl ? 'rtl' : 'ltr',
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
                textAlign: isRtl ? 'right' : 'left',
                whiteSpace: 'pre-line',
                direction: isRtl ? 'rtl' : 'ltr',
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
                direction: isRtl ? 'rtl' : 'ltr',
                textAlign: isRtl ? 'right' : 'left',
                '& .MuiAlert-message': {
                  direction: isRtl ? 'rtl' : 'ltr',
                  textAlign: isRtl ? 'right' : 'left',
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
              direction: isRtl ? 'rtl' : 'ltr',
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
              <Stack 
                direction="row" 
                alignItems="center" 
                spacing={1}
                sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "'Zain', Arial",
                    fontWeight: "bold",
                    fontSize: isMobile ? "16px" : "18px",
                    color: "white",
                    textAlign: "center",
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  {getTranslation('inquireButton', language)}
                </Typography>
                <img src={SendIcon} alt="" srcset="" style={{ transform: !isRtl ? 'scaleX(-1)' : 'none'}}/>
                {/* <Send sx={{ 
                  width: "24px", 
                  height: "24px", 
                  color: "white",
                  transform: isRtl ? 'scaleX(-1)' : 'none',
                }} /> */}
              </Stack>
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
              textAlign: isRtl ? 'right' : 'left',
              px: isMobile ? "10px" : "0",
              direction: isRtl ? 'rtl' : 'ltr',
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