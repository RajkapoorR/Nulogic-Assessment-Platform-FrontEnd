import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
import Logo from "../Logo";
import Scrollbar from "./Scrollbar";
import Iconify from "../iconify/Iconify";
import NavSection from "./TopNav";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const DRAWER_WIDTH = 200;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [userdata, setUserData] = useState({});
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    try {
      const accountInfo = localStorage?.getItem("employeeinfo");
      const user = JSON.parse(accountInfo);
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  let userType = [
    {
      title: "dashboard",
      path: "/dashboard",
      icon: getIcon("eva:pie-chart-2-fill"),
    },
    {
      title: "assessment",
      path: "/assessment",
      icon: getIcon("fluent:clipboard-task-list-rtl-20-filled"),
    },
    {
      title: "Scoreboard",
      path: "/scorecard",
      icon: getIcon("bxs:report"),
    },
    {
      title: "Logout",
      path: "/logout",
      icon: getIcon("eva:alert-triangle-fill"),
    },
  ];
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: 'white'
        },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          height: "100px",
          background: "#1976d2",
          alignItems: "center",
        }}
      >
        <Logo />
      </Box>

      <NavSection navConfig={userType} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
