import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function NotFound () {
  const navigate = useNavigate()
  const [content, setContent] = useState('')

  const status = useParams().status

  useEffect(() => {
    switch (status) {
      case '1001':
        setContent('Invalid Quiz ID, the quiz ID you provided does not exist')
        break
      case '1002':
        setContent('Invalid Player ID, the player ID you provided does not exist')
        break
      case '1003':
        setContent('Invalid Session ID, the Session ID you provided does not exist')
        break
      default:
        setContent('The page you are looking for does not exist')
    }
  }, [])

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
        <Typography variant="h3" gutterBottom textAlign={'center'}>
          404 Not Found
        </Typography>
        <Typography gutterBottom textAlign={'center'}>
          {content}
        </Typography>
        <Button color="primary" onClick={() => { navigate('/dashboard') }}>
          Dashboard
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
