import * as React from 'react'
import { useState } from 'react';
import { IconButton, ListItem, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material';

export default function QuestionThumbnail ({ text, width, height, focused, onClick, onDeleteClick, isDeletable }) {
  const [isMouseOnIcon, setIsMouseOnIcon] = useState(false)

  const setMouseOnIcon = () => {
    setIsMouseOnIcon(true)
  }

  const setMouseNotOnIcon = () => {
    setIsMouseOnIcon(false)
  }

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
      button={!isMouseOnIcon}
      onClick={onClick}
      data-testid="question-thumbnail"
    >
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >{text}</Typography>
      {isDeletable &&
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
          onClick={(event) => {
            onDeleteClick()
            event.stopPropagation()
          }}
          onMouseEnter={setMouseOnIcon}
          onMouseLeave={setMouseNotOnIcon}
        >
          <Cancel fontSize="inherit" />
        </IconButton>}
    </ListItem>
  )
}
