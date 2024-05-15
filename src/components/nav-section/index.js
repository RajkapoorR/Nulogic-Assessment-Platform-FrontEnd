import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardTopNav";
import DashboardSidebar from "./DashboardSideBar";

const APP_BAR_MOBILE = 60;
const APP_BAR_DESKTOP = 45;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <DashboardSidebar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
