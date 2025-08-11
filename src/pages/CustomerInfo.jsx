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
        <img src={Zain4G} alt="" srcset="" />
     
    );
  }
  
  if (marketEn.toLowerCase().includes('fiber')) {
    return         <img src={ZainFtth} alt="" srcset="" />
  }
  
  // Mobile services
  if (contractEn === 'BLINE') {
    return (
      <img src={Zain5G} alt="" srcset="" />
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
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "flex-start" : "center",
        padding: isMobile ? "16px" : "0",
        background: 'transparent',
      }}
    >
      <Box
        id="customer-lines-content"
        sx={{
          width: containerWidth,
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
            mb: "20px",
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
                left: language === 'ar' ? "0" : isMobile ? "10px" : "40px",
                right: language === 'ar' ? isMobile ? "20px" : "30px" : "auto",
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

        {/* Content */}
        <Stack spacing={2}>
          {/* Title Card */}
          <Card
            sx={{
              backgroundColor: "#1c3781",
              borderRadius: "8px",
              padding: isMobile ? "16px" : "18px 16px 20px 22px",
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
                textAlign: language === 'ar' ? 'right' : 'left',
              }}
            >
              {getTranslation('registeredNumbers', language)}
            </Typography>
          </Card>

          {/* Services List */}
          {data && data.length > 0 ? (
            data.map((service, index) => (
              <Card
                key={`${service.msisdn}-${index}`}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: isMobile ? "14px" : "16px 16px 16px 18px",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      direction: language === 'ar' ? 'rtl' : 'ltr',
                    }}
                  >
                    <Stack 
                      spacing={0.5} 
                      sx={{ 
                        flex: 1,
                        textAlign: language === 'ar' ? 'right' : 'left',
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
                          direction: 'ltr',
                          textAlign: language === 'ar' ? 'right' : 'left',
                        }}
                      >
                        {service.msisdn}
                      </Typography>
                      {console.log(service.eN_ContractType)
                      }
{service?.eN_ContractType=="PREPAID" || service?.eN_ContractType=="POSTPAID"?

<Typography
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontFamily: "'Zain', Arial",
                          fontWeight: 500,
                          color: "black",
                          letterSpacing: 0,
                          lineHeight: "normal",
                        }}
                      >
                        {getContractTypeDisplay(service, language)}
                      </Typography>
:""}
                      
                    </Stack>

                    <Avatar
                      sx={{
                        width: isMobile ? "44px" : "49px",
                        height: isMobile ? "44px" : "49px",
                        backgroundColor: "#3e579c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: language === 'ar' ? 0 : 2,
                        marginRight: language === 'ar' ? 2 : 0,
                      }}
                    >
                      {getServiceIcon(service, service, language)}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            ))
          ) : (
            <Alert severity="info" sx={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {getTranslation('noData', language)}
            </Alert>
          )}

          {/* PDF Error */}
          {pdfError && (
            <Alert severity="error" sx={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
              {pdfError}
            </Alert>
          )}

          {/* Action Buttons */}
          <Stack spacing={2}>
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
                direction: language === 'ar' ? 'rtl' : 'ltr',
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
                <>
                  <Typography
                    sx={{
                      fontSize: isMobile ? "15px" : "17px",
                      fontFamily: "'Zain', Arial",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {getTranslation('downloadPDF', language)}
                  </Typography>
                  <FileDownloadIcon sx={{ width: "24px", height: "24px" }} />
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              variant="outlined"
              onClick={onBack}
              sx={{
                borderColor: "#1c3781",
                color: "#1c3781",
                borderRadius: "5px",
                padding: isMobile ? "12px 15px" : "13px 15px",
                fontSize: isMobile ? "15px" : "17px",
                fontFamily: "'Zain', Arial",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1c378110",
                  borderColor: "#1c3781",
                },
              }}
            >
              {language === 'ar' ? 'العودة' : 'Back'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};