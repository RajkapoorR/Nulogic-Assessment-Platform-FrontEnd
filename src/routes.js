import { Navigate, useRoutes } from "react-router-dom";
// layouts
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/nav-section";
import QuizForm from "./components/form/QuizForm";
import AssessmentList from "./pages/Assessment";
import AssessmentLevelForm from "./components/form/AssessmentLevelForm";
import ScoreCard from "./pages/ScoreCard";
import Search from "./components/Search";

// ----------------------------------------------------------------------

export default function Router() {
  let userData;
  try { 
    userData =JSON.parse(sessionStorage.getItem('IsuserLogin'))
    console.log("route", userData);
  } catch (error) {
    console.error(error);
  }

  return useRoutes([
    {
      element:userData? <DashboardLayout />: <Navigate to="/" replace />,
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
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
    {
      path: "logout",
      element: <Login />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);
}
