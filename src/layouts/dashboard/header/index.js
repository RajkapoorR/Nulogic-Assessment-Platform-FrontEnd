import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import AccountPopover from './AccountPopover';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import logo from '../../../images/nuLogo1.png'

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `100%`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: 0,
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [user, setUser] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    try {
      const userDetail = JSON.parse(localStorage.getItem("userDetails"));
      setUser(userDetail?.role?.weightage);
      setUserId(userDetail?.employeeCode);
      console.log("Head", userDetail?.role?.weightage)
    } catch (error) {
      console.error(error)
    }
  }, [user])
  return (
    <StyledRoot>
      <StyledToolbar>


        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            {user > 96 && <Link to="dashboard"><Image src={logo}
              alt="bug" height={100} /></Link>}
            {user == 96 && <Link to="project/clients"><Image src={logo}
                alt="bug" height={100} /></Link>}
            {user < 96 && <Link to={`/home/allocation/detail/${userId}`}><Image src={logo}
                alt="bug" height={100} /></Link>}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user > 96 && <Nav.Link><Link to="dashboard">Dashboard</Link></Nav.Link>}
              {user > 95 &&<Nav.Link><Link to="allocation/search">Allocation</Link></Nav.Link>}
              {user > 95 &&<Nav.Link><Link to="project/clients">Projects</Link></Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <AccountPopover />
          </Stack>
        </Navbar>

      </StyledToolbar>
    </StyledRoot>
  );
}
