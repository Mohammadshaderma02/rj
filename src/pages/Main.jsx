import Send from "@mui/icons-material/Send";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import BackgroundImg from "../assets/BackgroundImg.png"

import React from "react";

export const Main = () => {
  return (
    <Box
      sx={{
          backgroundPosition: "50% 50%",        display: "grid",
        justifyItems: "center",
        alignItems: "start",
     
      }}
    >
      <Box
        sx={{
       
          width: "402px",
          height: "874px",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "370px",
            position: "absolute",
            top: "18px",
            left: "16px",
          }}
        >
          <Box sx={{ position: "relative", width: "133.33px", height: "35px" }}>
            <Box
              component="img"
              src="https://via.placeholder.com/93x33/ffffff/000000?text=ZAIN"
              alt="Zain Logo"
              sx={{
                width: "93px",
                height: "33px",
                position: "absolute",
                top: 0,
                left: "40px",
              }}
            />
            <Box
              component="img"
              src="https://via.placeholder.com/35x33/ffffff/000000?text=LOGO"
              alt="Logo Icon"
              sx={{
                width: "35px",
                height: "33px",
                position: "absolute",
                top: "2px",
                left: 0,
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              height: "34px",
              backgroundColor: "#20397e",
              border: "0.42px solid #6982c7",
              borderRadius: "5px",
              px: "15px",
              py: "5px",
              minWidth: "auto",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Zain-Bold', Helvetica",
                fontWeight: "bold",
                color: "white",
                fontSize: "13px",
                direction: "rtl",
              }}
            >
              العربية
            </Typography>
          </Button>
        </Stack>

        <Stack
          spacing={2.5}
          sx={{
            width: "370px",
            position: "absolute",
            top: "73px",
            left: "16px",
          }}
        >
          <Paper
            sx={{
              backgroundColor: "#1c3781",
              borderRadius: "8px",
              px: "27px",
              py: "25px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Zain-Bold', Helvetica",
                fontWeight: "bold",
                fontSize: "19px",
                lineHeight: "30px",
                color: "white",
                marginTop: "-1px",
              }}
            >
              Dear Customer ,<br />
              <br />
              Please press "inquire" button below to display all MSISDNs
              associated under your national ID number.
              <br />
              <br />
              Please note that this list is tied to your national number, please
              don't share this page ot link with anyone
            </Typography>
          </Paper>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#cf0072",
              borderRadius: "5px",
              px: "15px",
              py: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              "&:hover": {
                backgroundColor: "#cf0072",
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Zain-Bold', Helvetica",
                fontWeight: "bold",
                fontSize: "18px",
                color: "white",
                textAlign: "right",
                marginTop: "-0.42px",
              }}
            >
              Inquire
            </Typography>
            <Send sx={{ width: "24px", height: "24px", color: "white" }} />
          </Button>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Zain-Regular', Helvetica",
              fontWeight: "normal",
              fontSize: "19px",
              color: "white",
            }}
          >
            Please note that this page will expired in 7 days from receiving the
            link SMS
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Main;
