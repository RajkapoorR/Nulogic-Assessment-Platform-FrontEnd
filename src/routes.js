import { Navigate, useRoutes } from "react-router-dom";
// layouts
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/nav-section";
import QuizForm from "./components/form/QuizForm";
import AssessmentList from "./pages/Assessment";
import AssessmentLevelForm from "./components/form/AssessmentLevelForm";
import ScoreCard from "./pages/ScoreCard";

// ----------------------------------------------------------------------

export default function Router() {
  let userData;
  try {
    let userDetail = JSON.parse(localStorage.getItem("userDetails"));
    userData = userDetail?.role?.weightage;
    console.log("route", userData);
  } catch (error) {
    console.error(error);
  }

  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "assessment",
          element: <AssessmentList />,
        },
        {
          path: "assessmentform",
          element: <AssessmentLevelForm />,
        },
        {
          path: "questionform",
          element: <QuizForm />,
        },
        {
          path: "scorecard",
          element: <ScoreCard />,
        },
      ],
    },
    {
      path: "logout",
      element: <Login />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);
}
