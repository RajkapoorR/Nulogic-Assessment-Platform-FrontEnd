import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { GoogleLoginForm } from '../sections/auth/login';
import logo from '../images/nuLogo1.png'
import { Image } from 'react-bootstrap';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login({ setToken }) {
    const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
      <RootStyle style={{ backgroundImage: `linear-gradient(45deg, rgb(183 162 162), rgb(251 251 251 / 10%)), url(/assesmentportal.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <HeaderStyle>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle style={{ background: 'transparent', transition: 'none', boxShadow: 'none', display: 'block', width: '200px', height: '200px' }}>
            <Image src={logo}
       alt="bug" height={60} style={{ width: 'fit-content' }} />
          </SectionStyle>
        )}

        <div>
          <ContentStyle style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '250px' }}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              Sign in to Assessment Portal
            </Typography>
           <GoogleLoginForm />
          </ContentStyle>
        </div>
      </RootStyle>
  );

}