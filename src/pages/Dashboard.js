import { AccountCircle, Cookie, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  Container,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Page from "../components/Page";



const settings = {
  width: 200,
  height: 200,
  value: 60,
};

export default function Dashboard() {
  const navigate = useNavigate(); 
  const [auth, setAuth] = useState(true);
  const [data, setData] = useState({});
  const [searchOpen, setSearchOpen] = useState(false); // State to manage search dialog
  const [createOpen, setCreateOpen] = useState(false); // State to manage create user dialog
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    userRole: '',
    isActive: true,
    workingDomains: ''
  });
  const userProfileData = localStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileData);
  const email = userProfile?.email;
  const userRole = userProfile?.userRole;

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:8000/rest/v1/user/get-user?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const body = await response.text();
        const parsedResponse = JSON.parse(body);
        sessionStorage.setItem('userId', parsedResponse?.state?.id)
        sessionStorage.setItem('userRole', parsedResponse?.state?.userRole)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setData(parsedResponse?.state);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, [email]);

  // Function to handle search button click
  const handleSearchClick = () => {
    navigate('/Search')
    setSearchOpen(true); 
  };

  const handleCreateUserClick = () => {
    setCreateOpen(true);
  };

  const handleCreateUserClose = () => {
    setCreateOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      password: '',
      userRole: '',
      isActive: true,
      workingDomains: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCreateUserSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/rest/v1/user/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          workingDomains: formData.workingDomains.split(',').map(domain => domain.trim())
        }),
      });

      const result = await response.json();
      if(result?.success===false){
        alert(result?.errors)
      }
      else{
        alert("User Created successfully")
      }
      console.log('User created successfully:', result);
      // Handle success (e.g., close the dialog, reset form, show notification, etc.)
      handleCreateUserClose();
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (e.g., show error message, keep dialog open, etc.)
    }
  };

  return (
    <>
      <Page title="Dashboard">        
        {data.userRole === 'admin' && (
          <>
      <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: "0 auto",
                position:'relative',
                top:'150px',
                left:'200px',
                overflowX:'hidden'
              }}
            >
                          <Button
              variant="contained"
              sx={{ width: "300px", mt: 2 , height:'50px' }}
              onClick={handleSearchClick}
            >
              Search User
              <Search sx={{ ml: 1 }} />
            </Button>
            <Button
              variant="contained"
              sx={{ width: "300px", mt: 2, height:'50px' }}
              onClick={handleCreateUserClick}
            >
              Create User
            </Button>
            </Box>
          </>
        )}
        <Container
          maxWidth="xl"
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              width: "30%",
              height: "400px",
              display: "flex",
              flexDirection:"column",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius:'12px',
              boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: "0 auto"
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "deepPurple[500]",
                  width: "130px",
                  height: "130px",
                }}
                alt={data?.displayName}
                src={userProfile?.picture}
                title={data?.displayName}
              />
            </Box>
            <Box sx={{ width: "100%" ,paddingLeft:3,paddingTop:1,lineHeight:2.5,textAlign: 'center'}}>
              <Typography sx={{ color: "black" }}>
               <strong>Name :</strong> {data.displayName}
              </Typography>
              <Typography sx={{ color: "black" }}>
               <strong>Email :</strong>{data.email}
              </Typography>
              <Typography sx={{ color: "black" }}>
               <strong>User Role : </strong> {data.userRole}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>Active User: </strong>{data.isActive ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </Card>
        </Container>

        {/* Create User Dialog */}
        <Dialog open={createOpen} onClose={handleCreateUserClose}>
          <DialogTitle>Create User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new user, please enter the user's details here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="displayName"
              label="Display Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.displayName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="userRole"
              label="User Role"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.userRole}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  name="isActive"
                  color="primary"
                />
              }
              label="Active"
            />
            <TextField
              margin="dense"
              name="workingDomains"
              label="Working Domains"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.workingDomains}
              onChange={handleInputChange}
              helperText="Enter domains separated by commas"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateUserClose}>Cancel</Button>
            <Button onClick={handleCreateUserSubmit} variant="contained">Create</Button>
          </DialogActions>
        </Dialog>
      </Page>
    </>
  );
}
