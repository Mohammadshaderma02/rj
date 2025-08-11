// src/pages/CustomerInfo.jsx
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LanguageIcon from "@mui/icons-material/Language";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import ZainLogo from "../assets/White logo.svg"
import ZainGSM from "../assets/ZainGSMLogo.svg"
import Zain4G from "../assets/4g_mobiledata.svg"
import Zain5G from "../assets/5g_black.svg"
import ZainFtth from "../assets/Ftth_black.svg"
import File_save from "../assets/file_save.svg"
import WifiIcon from "@mui/icons-material/Wifi";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import { generateAdvancedPDF } from "../services/pdfService";

const getServiceIcon = (market, contractType, language) => {
  const marketEn = typeof market === 'string' ? market : market?.eN_Market || 'Mobile';
  const contractEn = typeof contractType === 'string' ? contractType : contractType?.eN_ContractType || 'PREPAID';

  // Determine icon based on market type
  if (marketEn.toLowerCase().includes('broadband') || marketEn.toLowerCase().includes('internet')) {
    if (contractEn === 'BLINE') {
      return <WifiIcon sx={{ color: "white", fontSize: "24px" }} />;
    }
    return (
        <img src={Zain4G} alt="" srcSet="" />
     
    );
  }
  
  if (marketEn.toLowerCase().includes('fiber')) {
    return <img src={ZainFtth} alt="" srcSet="" />
  }
  
  // Mobile services
  if (contractEn === 'BLINE') {
    return (
      <img src={Zain5G} alt="" srcSet="" />
    );
  }
  
  return <img src={ZainGSM} sx={{ color: "white", fontSize: "20px" }} />;
};

const getContractTypeDisplay = (contractType, language) => {
  if (typeof contractType === 'object') {
    return language === 'ar' ? contractType.aR_ContractType : contractType.eN_ContractType;
  }
  
  // Handle string values from API
  const contractMap = {
    'PREPAID': { en: 'Prepaid', ar: 'بطاقات مدفوعة مسبقاً' },
    'POSTPAID': { en: 'Postpaid', ar: ' ' },
    'BLINE': { en: '', ar: '' },
  };
  
  const mapped = contractMap[contractType?.toUpperCase()];
  return mapped ? (language === 'ar' ? mapped.ar : mapped.en) : contractType;
};

const getMarketTypeDisplay = (market, language) => {
  if (typeof market === 'object') {
    return language === 'ar' ? market.aR_Market : market.eN_Market;
  }
  
  // Handle string values from API
  const marketMap = {
    'Mobile': { en: 'Mobile', ar: 'خط مكالمات' },
    'Broadband Internet': { en: 'Broadband Internet', ar: 'انترنت برودباند' },
    'Fiber': { en: 'Fiber', ar: 'ألياف ضوئية' },
  };
  
  const mapped = marketMap[market];
  return mapped ? (language === 'ar' ? mapped.ar : mapped.en) : market;
};

export const CustomerInfo = ({ data, onBack }) => {
  const { language, toggleLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const isRtl = language === 'ar';

  const handleDownloadPDF = async () => {
    setDownloadingPdf(true);
    setPdfError(null);
    
    try {
      await generateAdvancedPDF(data, language);
    } catch (error) {
      console.error('PDF generation failed:', error);
      setPdfError(getTranslation('error', language));
    } finally {
      setDownloadingPdf(false);
    }
  };

  const containerWidth = isMobile ? "100%" : isTablet ? "500px" : "402px";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        direction: isRtl ? 'rtl' : 'ltr',
        overflow: "hidden",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          flexShrink: 0,
          backgroundColor: "transparent",
          padding: isMobile ? "16px" : "20px",
          paddingBottom: "10px",
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          <Box
            sx={{
              width: containerWidth,
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
                mb: "20px",
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
                    [isRtl ? 'right' : 'left']: isRtl ? 
                      (isMobile ? "20px" : "30px") : 
                      (isMobile ? "10px" : "40px"),
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
                  order: isRtl ? 1 : 2,
                  "&:hover": {
                    backgroundColor: "#1c3781",
                  },
                }}
              >
                <Typography
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

            {/* Fixed Title Card */}
            <Card
              sx={{
                backgroundColor: "#1c3781",
                borderRadius: "8px",
                padding: isMobile ? "16px" : "18px 16px 20px 22px",
                direction: isRtl ? 'rtl' : 'ltr',
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? "16px" : "19px",
                  fontFamily: "'Zain', Arial",
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: 0,
                  lineHeight: "normal",
                  textAlign: isRtl ? 'right' : 'left',
                  direction: isRtl ? 'rtl' : 'ltr',
                }}
              >
                {getTranslation('registeredNumbers', language)}
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Scrollable Services List - Middle Section */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "10px 16px" : "10px 20px",
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Box
          sx={{
            width: containerWidth,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {/* PDF Error - Above the list */}
          {pdfError && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                textAlign: isRtl ? 'right' : 'left',
                direction: isRtl ? 'rtl' : 'ltr',
                flexShrink: 0,
              }}
            >
              {pdfError}
            </Alert>
          )}

          {/* Scrollable Services List Container */}
          <Box
            className="scrollable-content"
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: isRtl ? "0" : "4px",
              paddingLeft: isRtl ? "4px" : "0",
              direction: isRtl ? 'rtl' : 'ltr',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#1c3781',
                borderRadius: '3px',
                '&:hover': {
                  background: '#20397e',
                },
              },
            }}
          >
            <Stack spacing={2} sx={{ paddingBottom: "10px" }}>
              {data && data.length > 0 ? (
                data.map((service, index) => (
                  <Card
                    key={`${service.msisdn}-${index}`}
                    className="service-card"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: isMobile ? "14px" : "16px 16px 16px 18px",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{ 
                        padding: 0, 
                        "&:last-child": { paddingBottom: 0 },
                      }}
                    >
                      {/* Fixed layout: Icon LEFT, Text RIGHT - regardless of language */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ 
                          width: "100%",
                        }}
                      >
                        {/* Avatar/Icon - Always on the LEFT */}
                        <Avatar
                          sx={{
                            width: isMobile ? "44px" : "49px",
                            height: isMobile ? "44px" : "49px",
                            backgroundColor: "#3e579c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            order: 1, // Always first (left)
                          }}
                        >
                          {getServiceIcon(service, service, language)}
                        </Avatar>

                        {/* Text Content - Always on the RIGHT */}
                        <Stack 
                          spacing={0.5} 
                          sx={{ 
                            flex: 1,
                           
                            float: isRtl ? 'right' : 'left',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: isMobile ? "14px" : "16px",
                              fontFamily: "'Zain', Arial",
                              fontWeight: 400,
                              color: "#000000b2",
                              letterSpacing: 0,
                              lineHeight: "normal",
                              direction: isRtl ? 'rtl' : 'ltr',
                              textAlign: isRtl ? 'right' : 'left',
                            }}
                          >
                            {getMarketTypeDisplay(service, language)}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: isMobile ? "20px" : "23px",
                              fontFamily: "'Zain', Arial",
                              fontWeight: "bold",
                              color: "black",
                              letterSpacing: 0,
                              lineHeight: "normal",
                              direction: 'ltr', // Always LTR for phone numbers
                              textAlign: isRtl ? 'right' : 'left',
                            }}
                          >
                            {service.msisdn}
                          </Typography>

                          {(service?.eN_ContractType === "PREPAID" || service?.eN_ContractType === "POSTPAID") && (
                            <Typography
                              sx={{
                                fontSize: isMobile ? "14px" : "16px",
                                fontFamily: "'Zain', Arial",
                                fontWeight: 500,
                                color: "black",
                                letterSpacing: 0,
                                lineHeight: "normal",
                                direction: isRtl ? 'rtl' : 'ltr',
                                textAlign: isRtl ? 'right' : 'left',
                              }}
                            >
                              {getContractTypeDisplay(service, language)}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Alert 
                  severity="info" 
                  sx={{ 
                    textAlign: isRtl ? 'right' : 'left',
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  {getTranslation('noData', language)}
                </Alert>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Fixed Bottom Action Buttons */}
      <Box
        sx={{
          flexShrink: 0,
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          padding: isMobile ? "16px" : "20px",
          display: "flex",
          justifyContent: "center",
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Box
          sx={{
            width: containerWidth,
            maxWidth: "100%",
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          <Stack 
            spacing={2}
            direction="row"
            sx={{
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            {/* Download PDF Button */}
            <Button
              variant="contained"
              onClick={handleDownloadPDF}
              disabled={downloadingPdf || !data || data.length === 0}
              sx={{
                backgroundColor: "#cf0072",
                borderRadius: "5px",
                padding: isMobile ? "12px 15px" : "13px 15px",
                fontSize: isMobile ? "15px" : "17px",
                fontFamily: "'Zain', Arial",
                fontWeight: "bold",
                color: "white",
                textTransform: "none",
                textAlign: "center",
                gap: "8px",
                flex: 1,
                direction: isRtl ? 'rtl' : 'ltr',
                "&:hover": {
                  backgroundColor: "#b8005f",
                },
                "&:disabled": {
                  backgroundColor: "#cf007280",
                },
              }}
            >
              {downloadingPdf ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  spacing={1}
                  sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
                >
                  <Typography
                    sx={{
                      fontSize: isMobile ? "15px" : "17px",
                      fontFamily: "'Zain', Arial",
                      fontWeight: "bold",
                      color: "white",
                      direction: isRtl ? 'rtl' : 'ltr',
                    }}
                  >
                    {getTranslation('downloadPDF', language)}
                  </Typography>
                  <img src={File_save} alt="" srcSet="" />
                </Stack>
              )}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};