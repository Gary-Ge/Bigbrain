import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import AlertDialog from '../Components/AlertDialog';
import { GET_SESSION_URL, HOST, getAuthHeader } from '../utils/utils';
import CountDownProgress from '../Components/CountDownProgress';

export default function Admin () {
  const sessionId = useParams().sessionId
  const [started, setStarted] = useState(false)
  const [alertDialogState, setAlertDialogState] = useState({
    open: false,
    content: ''
  })
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    fetch(`${HOST}${GET_SESSION_URL}/${sessionId}/status`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      if (!res.results.active) {
        setFinished(true)
      } else if (res.results.active && res.results.position === -1) {
        setStarted(false)
      } else if (res.results.active && res.results.position > -1) {
        setStarted(true)
      }
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={finished ? 'none' : 'flex'}
      >
        <Typography variant="h6" align='center' gutterBottom>
          {`Session ID: ${sessionId}`}
        </Typography>
        <Typography variant="h4" align='center' gutterBottom>
          {started ? 'The game has started' : 'The game has not started yet'}
        </Typography>
        <CountDownProgress
          countdownStart={20}
          remainingStart={66.6666667}
          step={100 / 30}
          display={true}
        />
        <Paper
          elevation={3}
          sx={{
            maxWidth: 'sm',
            width: '100%',
            minHeight: 150,
            marginTop: 1
          }}
        >
        </Paper>
      </Box>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={finished ? 'flex' : 'none'}
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
