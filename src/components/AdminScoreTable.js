import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ObtainedScoreTable from "./ObtainedScoreTable";
import { setDefaultLocale } from "react-datepicker";



export default function AdminScoreTable({ data, email }) {
  const [scoreData, setScoreData] = useState([]);
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  const [firstName, setFirstName] = useState([]);


  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/statistics`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScoreData(data?.state);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAsync();
  }, []);

  const onLinkClick = (item) => {
    console.log("Item", item)
    setShow(true);
    setUserEmail(item);
  }
  
  const extractFirstName = (userEmail) => {
    const username = userEmail?.split('.')[0]; // Extract username part before @ symbol
    return username?.charAt(0)?.toUpperCase() + username?.slice(1); // Capitalize first letter
};

  return (
    <>
      {!show ? (
        <>
        <Typography variant="h5" sx={{ mt: "30px", mb: "30px" }}>
          Assessment Statistics
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>DOMAIN </TableCell>
                <TableCell align="center">LEVEL</TableCell>
                <TableCell align="center">QUESTION CODE</TableCell>
                <TableCell align="center">USERS ATTENDED </TableCell>
                <TableCell align="center">TOTAL ATTENDEES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreData?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" align="center" scope="row">
                    {row.domainName}
                  </TableCell>
                  <TableCell align="center">{row.level}</TableCell>
                  <TableCell align="center">{row.questionCode}</TableCell>
                  <TableCell align="center">
                    {console.log(row?.userAttendees)}
                    {row?.userAttendees?.map((item) => (
                      <>
                        <a className="score-link" onClick={() => { onLinkClick(item) }}>{item}</a>
                        <br />
                      </>
                    ))}
                  </TableCell>
                  <TableCell align="center">{row.overallCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>)
        : (
          <><Typography variant="h5" sx={{ mb: "30px" }}>
            Performance Report of {extractFirstName(userEmail)}
          </Typography><ObtainedScoreTable email={userEmail} /></>
        )}
    </>
  );
}
