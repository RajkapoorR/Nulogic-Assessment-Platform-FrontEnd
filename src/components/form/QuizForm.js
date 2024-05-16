import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../iconify/Iconify";
import { useLocation } from "react-router-dom";
import ScorePopUp from "../Popup";

function QuizForm() {
  const [answers, setAnswers] = useState({});
  const [popup, setShowPopUp] = useState(false);
  const [scoreData, setScoreData] = useState({});
  const { state } = useLocation();

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  console.log(state)


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct array of objects containing selected answers
    const selectedAnswers = state?.questionList.map((question) => ({
      questionNumber: question.questionNumber,
      questionText: question.questionText,
      correctOptionIndex: answers[question.questionNumber],
    }));

    const data = {
      questionsDetails: selectedAnswers,
      userId: sessionStorage.getItem('userId'),
      questionCode: state?.questionCode
    }

    try {
      const response = await fetch(`http://localhost:8000/rest/v1/assessment/submitResponse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      );
      const body = await response.text()
      const parsedResponse = JSON.parse(body);
      setShowPopUp(true)
      setScoreData(parsedResponse?.state);
      console.log(parsedResponse)
      console.log("userScore",parsedResponse?.state)
      if (parsedResponse?.success === false) {
        alert(parsedResponse?.errors)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box sx={{ mt: "100px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
        {state?.domain} - {state?.level}
        </Typography>
      </Stack>
      {console.log(scoreData)}
      {popup &&
        <ScorePopUp showPopup={popup} score={scoreData} />
      }
      <Card sx={{ p: 5 }}>
        <form onSubmit={handleSubmit}>
          <div className="question">
            {state?.questionList?.map((item) => (
              <Stack
                key={item.questionNumber}
                sx={{ gap: "10px", flexDirection: "column", pt: "20px" }}
              >
                <label>
                  {item.questionNumber}.{item.questionText}
                </label>
                <div>
                  {item?.options?.map((opt, index) => (
                    <Stack
                      key={opt}
                      sx={{
                        gap: "15px",
                        pt: "5px",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <input
                        type="radio"
                        id={opt}
                        name={item?.questionNumber}
                        value={opt}
                        checked={answers[item?.questionNumber] === index}
                        onChange={() =>
                          handleAnswerChange(item.questionNumber, index)
                        }
                        required
                      />
                      <label htmlFor={opt}>{opt}</label>
                    </Stack>
                  ))}
                </div>
              </Stack>
            ))}
          </div>

          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-end"
            sx={{ mt: "20px" }}
          >
            <LoadingButton
              type="submit"
              sx={{ width: 120 }}
              loading={false}
              onClick={handleSubmit}
              loadingPosition="start"
              startIcon={<Iconify />}
              variant={"contained"}
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

export default QuizForm;
