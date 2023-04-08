import * as React from 'react';
import { useState } from 'react';
import { CREATE_GAME_URL, getAuthHeader, HOST, validNotNull } from '../utils/utils';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import InputDialog from './InputDialog';
import AlertDialog from './AlertDialog';

export default function AddCard ({ onSubmitSuccess }) {
  const [inputDialogOpen, setInputDialogOpen] = useState(false)
  const [gameName, setGameName] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState('')

  const openInputDialog = () => {
    setInputDialogOpen(true)
  }

  const closeInputDialog = () => {
    setGameName('')
    setError(false)
    setHelperText('')
    setInputDialogOpen(false)
  }

  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
  }

  const onGameNameChange = (event) => {
    setGameName(event.target.value)
  }

  const checkValidity = () => {
    if (!validNotNull(gameName)) {
      setError(true)
      setHelperText('Please input the game name')
      return false
    }
    setError(false)
    setHelperText('')
    return true
  }

  const onSubmit = () => {
    if (checkValidity()) {
      fetch(`${HOST}${CREATE_GAME_URL}`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ name: gameName })
      }).then(res => res.json()).then(res => {
        if (res.error != null) {
          throw new Error(res.error)
        }
        closeInputDialog()
        onSubmitSuccess()
      }).catch(error => {
        setAlertDialogContent(error.message)
        setAlertDialogOpen(true)
      })
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }} onClick={openInputDialog}>
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
        gameName={gameName}
        error={error}
        helperText={helperText}
        onChange={onGameNameChange}
        onSubmit={onSubmit}
        onBlur={checkValidity}
      ></InputDialog>
      <AlertDialog
        open={alertDialogOpen}
        onClose={closeAlertDialog}
        content={alertDialogContent}
      >
      </AlertDialog>
    </Card>
  )
}
