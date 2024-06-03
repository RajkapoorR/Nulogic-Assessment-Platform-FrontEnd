import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Page from "../components/Page";
import Scrollbar from "../components/nav-section/Scrollbar";
import { assessmentData } from "../constant";
import AssessmentTable from "../components/AssessmentTable";
import UserInput from "../components/inputfield/InputField";
import AssignTaskForm from "../components/form/AssignTaskForm";
import { useState } from "react";
import Domain from "../components/domain/Domain";

export default function AssessmentList() {
  const [auth, setAuth] = React.useState(true);
  const [data, setData] = useState({});
  const [domain, setDomain] = useState({})

  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;

  console.log(domain)
  React.useEffect(() => {
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

  const handleFileUpload = async (e) => {
    const fileName = e.target.files[0];


    console.log(fileName)
    const formData = new FormData();
    formData.append('file', fileName);
    formData.append('fileName', 'abcd'); 
    try {
      const response = await fetch(`http://localhost:8000/rest/v1/assessment/upload-csv`, {
        method: 'POST',
        body: formData,
        'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
      });
     
      const body = await response.text();
      const parsedResponse = JSON.parse(body);
      window.alert(parsedResponse?.status)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setDomain(parsedResponse?.state?.domains);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // React.useEffect(() => {
  //   const fetchDomain = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/rest/v1/assessment/questionCodes`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       const body = await response.text();
  //       const parsedResponse = JSON.parse(body);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       setDomain(parsedResponse?.state?.domains);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchDomain();
  // }, []);


  return (
    <>
      <Page title="Asessment">
        <div>
          {
            data?.userRole === 'admin' ? (<><Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                onChange={handleFileUpload}
                multiple
                type="file" />
              <label htmlFor="raised-button-file">
                <Button
                  variant="raised"
                  sx={{
                    background: "#1565c0",
                    color: "white",
                  }}
                  component="span"

                >
                  Upload Question
                </Button>
              </label>
            </Stack><Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
                <AssignTaskForm data={domain} email={data} />
              </Stack>
              <Stack>
              <Domain />
              </Stack>
              </>)
              : (<><Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  variant={"contained"}
                  sx={{ mb: "20px" }}
                  onClick={() => (window.location.href = "/assessmentform")}
                >
                  Launch Assessment
                </Button>
              </Stack><Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                  <Typography variant="h4" gutterBottom sx={{ mb: "20px" }}>
                    Assigned Assessment
                  </Typography>
                </Stack><AssessmentTable email={email} /></>)}
        </div>
      </Page>
    </>
  );
}
