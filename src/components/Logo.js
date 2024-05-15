import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../images/nuLogo1.png";

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = <Box component="img" src={logoImg} sx={{ height: 50, ...sx }} />;
  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/dashboard">{logo}</RouterLink>;
}
