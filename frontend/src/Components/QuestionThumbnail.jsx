import * as React from 'react'
import { ListItem, IconButton } from '@mui/material'
import { Cancel } from '@mui/icons-material';

export default function QuestionThumbnail ({ text, width, height }) {
  return (
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { width },
        maxWidth: { width },
        height: { height },
        maxHeight: { height },
        backgroundColor: 'white',
        margin: 1,
        borderRadius: 1
      }}
    >
      {text}
      <IconButton
        aria-label="delete"
        color='inherit'
        sx={{
          position: 'absolute',
          top: -7,
          right: -7,
          backgroundColor: 'transparent',
          color: 'red',
          padding: 0,
          width: 24,
          height: 24,
        }}
      >
        <Cancel fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
