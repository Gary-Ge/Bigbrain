import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADER, HOST, PLAY_GAME_URL } from '../utils/utils';

export default function PlayGame () {
  const playerId = useParams().playerId
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)

  // Check if the playerID is valid
  useEffect(() => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/status`, {
      method: 'GET',
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setStarted(res.started)
    }).catch(error => {
      if (error.message === 'Player ID does not refer to valid player id') {
        navigate('/notfound')
      }
    })
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={started ? 'none' : 'flex'}
      >
        <Typography variant="h5" align='center' gutterBottom>
          {`Your player ID is ${playerId}.`}
        </Typography>
        <Typography variant="h3" align='center' gutterBottom>
          The game has not started yet, please wait
        </Typography>
      </Box>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - var(--nav-h))'
        display={started ? 'flex' : 'none'}
      >
        <Typography variant="h5" align='center' gutterBottom>
          {`Your player ID is ${playerId}.`}
        </Typography>
      </Box>
    </Container>
  )
}
