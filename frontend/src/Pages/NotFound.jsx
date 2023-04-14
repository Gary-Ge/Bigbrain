import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound () {
  const navigate = useNavigate()

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
        <Typography variant="h3" gutterBottom>
          404 Not Found
        </Typography>
        <Typography gutterBottom>
          The page does not exist
        </Typography>
        <Button color="primary" onClick={() => { navigate('/dashboard') }}>
          Dashboard
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
