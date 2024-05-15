import { AccountCircle, Cookie } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Page from "../components/Page";
import user from "../images/user.png";
import { useEffect } from "react";

const settings = {
  width: 200,
  height: 200,
  value: 60,
};

export default function Dashboard() {
  const [auth, setAuth] = React.useState(true);
  const [data, setData] = React.useState({});
  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/user/get-user?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const body = await response.text();
        const parsedResponse = JSON.parse(body);
        sessionStorage.setItem('userId', parsedResponse?.state?.id)
        sessionStorage.setItem('userRole', parsedResponse?.state?.userRole)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setData(parsedResponse?.state);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, []);


  return (
    <>
      <Page title="Dashboard">
        <Container
          maxWidth="xl"
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "50%",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)",
            }}
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "deepPurple[500]",
                  width: "150px",
                  height: "150px",
                }}
                alt={data?.displayName}
                src={userProfile?.picture}
                title={data?.displayName}
              />
            </Box>
            <Box sx={{ width: "60%" }}>
              <Typography sx={{ color: "white" }}>
                Name :{data.displayName}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Email :{data.email}
              </Typography>
              <Typography sx={{ color: "white" }}>
                User Role : {data.userRole}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Active User: {data.active ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
}
