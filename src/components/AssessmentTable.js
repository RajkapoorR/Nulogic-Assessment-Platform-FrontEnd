import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { getQuestion } from "../utils/getQuestion";
import { useNavigate } from "react-router-dom";

export default function AssessmentTable({ email}) {
  const [assesmentData, setAssesmentData] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/assessment/fetchUserAssessment?assessmentStatus=ASSIGNED&userEmail=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssesmentData(data?.state);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, [email]);

  console.log(assesmentData)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>DOMAIN </TableCell>
            <TableCell align="right">LEVEL</TableCell>
            <TableCell align="right">QUESTION CODE</TableCell>
            <TableCell align="right">ASSESSMENT STATUS</TableCell>
            <TableCell align="right">POINTS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {assesmentData?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.domain}
              </TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.questionCode}</TableCell>
              <TableCell align="right">{row.assessmentStatus}</TableCell>
              <TableCell align="right">{row.totalQuestionScore}</TableCell>
              <TableCell align="right">{row.assessmentStatus == 'ASSIGNED' && <Button
                variant={"contained"}
                sx={{ mb: "20px", color: 'white !important' }}
                onClick={async () => {
                  const data = await getQuestion(row.domain, row.level, row.questionCode,email)
                  navigate('/questionform', {
                    ...data
                  })
                }}
              >
                Take Assessment
              </Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
