import * as React from 'react'
import { IconButton, ListItem } from '@mui/material'
import { Cancel } from '@mui/icons-material';

export default function QuestionThumbnail ({ text, width, height, focused, onClick }) {
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
        margin: 1,
        borderRadius: 1,
        backgroundColor: focused ? '#33bfff' : 'white'
      }}
      button={true}
      onClick={onClick}
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
        onClick={() => { console.log('bb') }}
      >
        <Cancel fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
}
