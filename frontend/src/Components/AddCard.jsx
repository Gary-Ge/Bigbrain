import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import InputDialog from './InputDialog';

export default function AddCard ({ onSubmitSuccess }) {
  const [inputDialogOpen, setInputDialogOpen] = useState(false)

  const openInputDialog = () => {
    setInputDialogOpen(true)
  }

  const closeInputDialog = () => {
    setInputDialogOpen(false)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }} onClick={openInputDialog} data-testid='add-card-action-area'>
        <CardMedia
          sx={{
            minHeight: 200,
            height: '100%',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          image='assets/add-game.svg'
        >
        </CardMedia>
      </CardActionArea>
      <InputDialog
        open={inputDialogOpen}
        onClose={closeInputDialog}
        onSuccess={onSubmitSuccess}
      ></InputDialog>
    </Card>
  )
}
