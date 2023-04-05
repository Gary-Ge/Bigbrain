import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class AlertDialog extends React.Component {
  render () {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{this.props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AlertDialog
