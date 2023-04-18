import * as React from 'react';
import { Box, Paper } from '@mui/material';

export default function ImageDisplay ({ minWidth, maxWidth, src, alt, onClick }) {
  return (
    <Box
      minWidth={minWidth}
      maxWidth={maxWidth}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: 'pointer'
      }}
      onClick={onClick}
      data-testid="image-display-box"
    >
      <Paper elevation={3} sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
          alt={alt}
          src={src}
        />
      </Paper>
    </Box>
  )
}
