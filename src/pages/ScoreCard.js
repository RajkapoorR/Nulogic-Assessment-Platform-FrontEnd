import { AccountCircle } from "@mui/icons-material";
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
import AssessmentTable from "../components/AssessmentTable";
import { assessmentData, scoreData } from "../constant";
import ObtainedScoreTable from "../components/ObtainedScoreTable";
import AdminScoreTable from "../components/AdminScoreTable";
import { useState } from "react";

export default function ScoreCard() {
  const [auth, setAuth] = React.useState(true);
  const [data, setData] = useState({});
  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;
  
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/user/get-user?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data?.state);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <Page title="ScoreCard">{
      data?.userRole === 'admin' ?( <><AdminScoreTable email={email} /></>):(
        <><Typography variant="h5" sx={{ mb: "30px" }}>
              Performance Report
            </Typography><ObtainedScoreTable email={email} /></>)}
       
      </Page>
    </>
  );
}
