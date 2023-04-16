import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function ImageSlide ({ playerId }) {
  const API_KEY = 'VMdRKWfOBP3FA3tdd0QKeA==PuGVVzkDRtx479yi'
  const [imageSrc, setImageSrc] = useState('/assets/default-background.jpg')

  const fetchImage = () => {
    fetch('https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080', {
      method: 'GET',
      headers: { 'X-Api-Key': API_KEY, Accept: 'image/jpg' },
    }).then(res => res.blob()).then(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setImageSrc(base64data)
      };
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    fetchImage();
    const intervalId = setInterval(fetchImage, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - var(--nav-h))', overflow: 'hidden' }}>
      <Paper
        square
        elevation={0}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            margin: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 1
          }}
        >
          <Typography variant="h6" align='center' gutterBottom ml={1} mr={1} mt={1}>
            {`Your player ID is ${playerId}.`}
          </Typography>
          <Typography variant="h4" align='center' gutterBottom ml={1} mr={1}>
            The game has not started yet, please wait
          </Typography>
          <Typography variant="body2" align='center' gutterBottom ml={1} mr={1}>
            Enjoy beautiful scene
          </Typography>
        </Paper>
      </Paper>
    </Box>
  )
}
