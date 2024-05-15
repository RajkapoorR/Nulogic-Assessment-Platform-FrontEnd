import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ScorePopUp({score, showPopup}) {

  console.log(score)
  const [open, setOpen] = React.useState(showPopup);
 
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    setOpen(showPopup);
  },[showPopup]);

  return (
    <React.Fragment> 
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} variant='h5' id="customized-dialog-title">
          Perfect !
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <Typography variant='h6' gutterBottom>
            You're scored {score?.userScore} out of {score?.totalQuestionScore}
          </Typography> 
        </DialogContent> 
      </BootstrapDialog>
    </React.Fragment>
  );
}