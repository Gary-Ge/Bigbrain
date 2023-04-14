import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function PlayGame () {
  const playerId = useParams().playerId

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - var(--nav-h))',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {`Your player ID is ${playerId}.`}
        </Typography>
        <Typography variant="h3" gutterBottom>
          The game has not started yet, please wait
        </Typography>
      </Box>
    </Container>
  )
}
