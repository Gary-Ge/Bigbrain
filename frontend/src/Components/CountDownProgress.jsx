import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CountDownProgress ({ countdownStart, remainingStart, step, display }) {
  const [countdown, setCountdown] = useState(countdownStart)
  const [remaining, setRemaining] = useState(remainingStart)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      setRemaining((prevRemaining) => prevRemaining - step);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  return (
    <Paper
      elevation={3}
      sx={{
        minHeight: 30,
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        left: 0,
        right: 0,
        display: display ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LinearProgress
        variant="determinate"
        value={remaining}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#33eaff',
          },
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Typography variant="h7">{countdown}</Typography>
      </Box>
    </Paper>
  )
}
