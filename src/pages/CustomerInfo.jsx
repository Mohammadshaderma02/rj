import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LanguageIcon from "@mui/icons-material/Language";
import BackgroundImg from "../assets/BackgroundImg.png"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const serviceData = [
  {
    id: 1,
    type: "Broadband Internet",
    number: "0798765432",
    icon: "4G",
    subtitle: null,
  },
  {
    id: 2,
    type: "Mobile",
    number: "0798765432",
    icon: "mobile",
    subtitle: "Prepaid",
  },
  {
    id: 3,
    type: "Broadband Internet",
    number: "0798765432",
    icon: "5G",
    subtitle: null,
  },
  {
    id: 4,
    type: "Fiber",
    number: "0798765432",
    icon: "fiber",
    subtitle: null,
  },
  {
    id: 5,
    type: "Mobile",
    number: "0798765432",
    icon: "mobile",
    subtitle: "Postpaid",
  },
];

const getServiceIcon = (iconType) => {
  switch (iconType) {
    case "4G":
      return (
        <Typography
          sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
        >
          4G
        </Typography>
      );
    case "5G":
      return (
        <Typography
          sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
        >
          5G
        </Typography>
      );
    case "fiber":
      return <FlashOnIcon sx={{ color: "white", fontSize: "24px" }} />;
    case "mobile":
      return <LanguageIcon sx={{ color: "white", fontSize: "24px" }} />;
    default:
      return (
        <Typography
          sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
        >
          4G
        </Typography>
      );
  }
};

export const List = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${BackgroundImg})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
      }}
    >
      <Box
        sx={{
          width: "402px",
          height: "874px",
          position: "relative",
          backgroundImage: "url(/list.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: "absolute",
            top: "18px",
            left: "16px",
            width: "370px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              width: "133.33px",
              height: "35px",
            }}
          >
            <Box
              component="img"
              src="/fill-3.svg"
              alt="Fill"
              sx={{
                width: "35px",
                height: "33px",
                position: "absolute",
                top: "2px",
                left: 0,
              }}
            />
            <Box
              component="img"
              src="/fill-1.svg"
              alt="Fill"
              sx={{
                width: "93px",
                height: "33px",
                position: "absolute",
                top: 0,
                left: "40px",
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#20397e",
              border: "0.42px solid #6982c7",
              borderRadius: "5px",
              padding: "5px 15px",
              height: "34px",
              fontSize: "13px",
              fontFamily: "'Zain-Bold', Helvetica",
              fontWeight: "bold",
              color: "white",
              textTransform: "none",
              direction: "rtl",
              "&:hover": {
                backgroundColor: "#20397e",
              },
            }}
          >
            العربية
          </Button>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            position: "absolute",
            top: "73px",
            left: "16px",
            width: "370px",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#1c3781",
              borderRadius: "8px",
              padding: "18px 16px 20px 22px",
            }}
          >
            <Typography
              sx={{
                fontSize: "19px",
                fontFamily: "'Zain-Bold', Helvetica",
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0,
                lineHeight: "normal",
              }}
            >
              You have the below numbers register under your national number
            </Typography>
          </Card>

          {serviceData.map((service) => (
            <Card
              key={service.id}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px 16px 16px 18px",
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
                >
                  <Stack spacing={0.5} sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "'Nunito Sans-Regular', Helvetica",
                        fontWeight: 400,
                        color: "#000000b2",
                        letterSpacing: 0,
                        lineHeight: "normal",
                      }}
                    >
                      {service.type}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "23px",
                        fontFamily: "'Zain-Bold', Helvetica",
                        fontWeight: "bold",
                        color: "black",
                        letterSpacing: 0,
                        lineHeight: "normal",
                      }}
                    >
                      {service.number}
                    </Typography>

                    {service.subtitle && (
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontFamily: "'Nunito Sans-Medium', Helvetica",
                          fontWeight: 500,
                          color: "black",
                          letterSpacing: 0,
                          lineHeight: "normal",
                        }}
                      >
                        {service.subtitle}
                      </Typography>
                    )}
                  </Stack>

                  <Avatar
                    sx={{
                      width: "49px",
                      height: "49px",
                      backgroundColor: "#3e579c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getServiceIcon(service.icon)}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#cf0072",
              borderRadius: "5px",
              padding: "13px 15px",
              fontSize: "17px",
              fontFamily: "'Zain-Bold', Helvetica",
              fontWeight: "bold",
              color: "white",
              textTransform: "none",
              textAlign: "right",
              gap: "4.24px",
              "&:hover": {
                backgroundColor: "#cf0072",
              },
            }}
            endIcon={
              <FileDownloadIcon sx={{ width: "24px", height: "24px" }} />
            }
          >
            Download as PDF
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
