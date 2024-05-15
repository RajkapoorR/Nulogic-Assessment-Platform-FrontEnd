import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";

export default function ObtainedScoreTable({email,data }) {
  const [scoreData , setScoreData] = useState([]);
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/fetchUserAssessment?userEmail=${email}`);
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
  }, [email]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>DOMAIN </TableCell>
            <TableCell align="center">LEVEL</TableCell>
            <TableCell align="center">QUESTION CODE</TableCell>
            <TableCell align="center">ASSESSMENT STATUS</TableCell>
            <TableCell align="center">SCORE OBTAINED</TableCell>
            <TableCell align="center">OUT OF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreData?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" align="center" scope="row">
                {row.domain}
              </TableCell>
              <TableCell align="center">{row.level}</TableCell>
              <TableCell align="center">{row.questionCode}</TableCell>
              <TableCell align="center">{row.assessmentStatus}</TableCell>
              <TableCell align="center">
                {row.score} 
              </TableCell>
              <TableCell align="center">
                {row.totalQuestionScore} 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
