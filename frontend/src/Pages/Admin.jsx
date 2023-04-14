import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import AlertDialog from '../Components/AlertDialog';
import { GET_SESSION_URL, HOST, getAuthHeader } from '../utils/utils';
import CountDownProgress from '../Components/CountDownProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Admin () {
  const sessionId = useParams().sessionId
  const [alertDialogState, setAlertDialogState] = useState({
    open: false,
    content: ''
  })
  const [sessionState, setSessionState] = useState(null)

  const updateSessionStatus = () => {
    fetch(`${HOST}${GET_SESSION_URL}/${sessionId}/status`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setSessionState(res.results)
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }

  useEffect(() => {
    updateSessionStatus()
  }, [])

  return (
    <Container maxWidth='lg'>
      <CountDownProgress
        countdownStart={20}
        remainingStart={66.6666667}
        step={100 / 30}
        display={sessionState !== null && sessionState.position > -1}
      />
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={sessionState !== null && !sessionState.active ? 'none' : 'flex'}
      >
        <Typography variant="h6" align='center' gutterBottom>
          {`Session ID: ${sessionId}`}
        </Typography>
        <Typography variant="h4" align='center' gutterBottom>
          {sessionState !== null && sessionState.position > -1 ? 'The game has started' : 'The game has not started yet'}
        </Typography>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 250,
            width: '100%',
            minHeight: 150,
            marginTop: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5
          }}
        >
          <IconButton
            sx={{
              fontSize: '5rem',
              width: '5rem',
              height: '5rem'
            }}
          >
            {sessionState !== null && sessionState.position > -1 ? <StopIcon fontSize='5rem'/> : <PlayArrowIcon fontSize='5rem'/>}
          </IconButton>
          <IconButton
            sx={{
              fontSize: '5rem',
              width: '5rem',
              height: '5rem',
              display: sessionState !== null && sessionState.position > -1 ? 'block' : 'none'
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={sessionState !== null && !sessionState.active ? 'flex' : 'none'}
      >
        <Typography variant="h5" align='center' gutterBottom>
          {'The session has been finished'}
        </Typography>
      </Box>
      <AlertDialog
        {...alertDialogState}
        onClose={() => setAlertDialogState({ ...alertDialogState, open: false })}
      >
      </AlertDialog>
    </Container>
  )
}
