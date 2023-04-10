import * as React from 'react';
import { Box, Paper } from '@mui/material';

export default function ImageDisplay ({ maxWidth, src, alt }) {
  return (
    <Box maxWidth={maxWidth} display="flex" justifyContent="center" alignItems="center">
      <Paper elevation={3} style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
      </Paper>
    </Box>
  )
}
