import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InputDialog ({ open, onClose, gameName, error, helperText, onChange, onSubmit, onBlur }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please input the name of the game to be created.
        </DialogContentText>
        <TextField
          autoFocus
          id="game-name"
          type="text"
          variant="standard"
          fullWidth
          value={gameName}
          error={error}
          helperText={helperText}
          onChange={onChange}
          onBlur={onBlur}
        >
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
