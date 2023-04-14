import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';

export default function ConfirmDialog ({ open, content, onClose, onConfirm, confirmButtonContent = 'Confirm' }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
      <DialogContent>
        {content.split('\n').map((line, index) => (
          <DialogContentText key={index} gutterBottom>
            {line}
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onConfirm}>{confirmButtonContent}</Button>
      </DialogActions>
    </Dialog>
  )
}
