import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import * as React from "react";
  import { useState } from "react";
  
  const Domain = () => {
    const [formData, setFormData] = React.useState({
      name: '',
      levels: ''
    });
    const [createOpen, setCreateOpen] = useState(false);
  
    const resetForm = () => {
      setFormData({
        name: '',
        levels: ''
      });
    };
  
    const handleCreateDomainSubmit = async () => {
      try {
        const response = await fetch('http://localhost:8000/rest/v1/assessment/create-domain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            levels: formData.levels.split(',').map(domain => domain.trim())
          }),
        });
        const result = await response.json();
        console.log('Domain created successfully:', result);
        if (response?.success === false) {
          alert(result?.errors);
        } else {
          alert(result?.status);
        }      
        handleCreateDomainClose();
      } catch (error) {
        console.error('Error creating domain:', error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleCreateDomainClose = () => {
      setCreateOpen(false);
      resetForm();
    };
  
    const handleCreateDomainClick = () => {
      setCreateOpen(true);
    };
  
    return (
      <>
        <Button
          variant="contained"
          sx={{ width: "300px", mt: 2 }}
          onClick={handleCreateDomainClick}
        >
          Create Domain
        </Button>
        <Dialog open={createOpen} onClose={handleCreateDomainClose}>
          <DialogTitle>Create Domain</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new domain, please enter the domain details here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Domain Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="levels"
              label="Domain Levels"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.levels}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateDomainClose}>Cancel</Button>
            <Button onClick={handleCreateDomainSubmit} variant="contained">Create Domain</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  export default Domain;
  