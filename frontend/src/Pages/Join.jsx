import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import AlertDialog from '../Components/AlertDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADER, HOST, JOIN_GAME_URL } from '../utils/utils';

export default function Join ({ withSessionId }) {
  const nominatedSessionId = useParams().sessionId
  const navigate = useNavigate()

  const [sessionIdTextStatus, setSessionIdTextStatus] = useState({
    error: false,
    helperText: ''
  })
  const [playerNameTextStatus, setPlayerNameTextStatus] = useState({
    error: false,
    helperText: ''
  })
  const [alertDialogState, setAlertDialogState] = useState({
    open: false,
    content: ''
  })
  const [sessionId, setSessionId] = useState('')
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    if (withSessionId) {
      setSessionId(nominatedSessionId)
    }
  }, [])

  const checkValidity = () => {
    const value = sessionId
    if (value === null || value === '') {
      setSessionIdTextStatus({
        error: true,
        helperText: 'Please input a valid session ID'
      })
      return
    }
    for (const c of value) {
      if (c < '0' || c > '9') {
        setSessionIdTextStatus({
          error: true,
          helperText: 'Session ID should be a number'
        })
        return
      }
    }
    setSessionIdTextStatus({
      error: false,
      helperText: ''
    })
  }

  const checkNameNotNull = () => {
    if (playerName === null || playerName === '') {
      setPlayerNameTextStatus({
        error: true,
        helperText: 'Please input a name'
      })
      return
    }
    setPlayerNameTextStatus({
      error: false,
      helperText: ''
    })
  }

  const joinSession = (event) => {
    event.preventDefault()
    const value = sessionId
    if (value === null || value === '') {
      setSessionIdTextStatus({
        error: true,
        helperText: 'Please input a valid session ID'
      })
      return
    }
    for (const c of value) {
      if (c < '0' || c > '9') {
        setSessionIdTextStatus({
          error: true,
          helperText: 'Session ID should be a number'
        })
        return
      }
    }
    setSessionIdTextStatus({
      error: false,
      helperText: ''
    })
    if (playerName === null || playerName === '') {
      setPlayerNameTextStatus({
        error: true,
        helperText: 'Please input a name'
      })
      return
    }
    setPlayerNameTextStatus({
      error: false,
      helperText: ''
    })
    fetch(`${HOST}${JOIN_GAME_URL}/${sessionId}`, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify({ name: playerName })
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      navigate(`/play/${res.playerId}`)
    }).catch(error => {
      if (error.message === 'Session ID is not an active session') {
        setAlertDialogState({
          open: true,
          content: `${error.message}. Please enter an valid and active session ID. Or if you intend to join a game with a direct URL, please check the correctness of the URL and reenter it.`
        })
      } else {
        setAlertDialogState({
          open: true,
          content: error.message
        })
      }
    })
  }

  return (
    <Container maxWidth='sm'>
      <Box component={'form'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - var(--nav-h))',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Join Game
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          required
          label='Session ID'
          autoFocus
          {...sessionIdTextStatus}
          onBlur={checkValidity}
          value={sessionId}
          onChange={(event) => { setSessionId(event.target.value) }}
          disabled={ withSessionId }
        >
        </TextField>
        <TextField
          margin="normal"
          fullWidth
          required
          label='Player Name'
          {...playerNameTextStatus}
          onBlur={checkNameNotNull}
          value={playerName}
          onChange={(event) => { setPlayerName(event.target.value) }}
        >
        </TextField>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          onClick={joinSession}
          sx={{
            mt: 1
          }}
        >Join</Button>
      </Box>
      <AlertDialog
        {...alertDialogState}
        onClose={() => setAlertDialogState({ ...alertDialogState, open: false })}
      >
      </AlertDialog>
    </Container>
  )
}
