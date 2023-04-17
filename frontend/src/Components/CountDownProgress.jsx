import React from 'react';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CountDownProgress ({ countdown = 100, progress = 100, display = true }) {
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
        value={progress}
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
