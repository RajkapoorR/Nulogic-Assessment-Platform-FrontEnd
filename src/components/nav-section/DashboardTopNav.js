import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";

function DashboardNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(false);
  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;
  const name = userProfile?.name;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ height: "100px", justifyContent: "center" }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: "10px",
        }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={userProfile?.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px", p: "20px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Typography variant="body2" sx={{ p: "10px" }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ p: "10px" }}>
              {email}
            </Typography>
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
}
export default DashboardNavbar;
