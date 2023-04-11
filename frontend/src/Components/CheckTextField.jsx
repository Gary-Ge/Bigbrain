import * as React from 'react'
import { TextField, InputAdornment, IconButton, Checkbox } from '@mui/material'

export default function CheckTextField ({ label, required }) {
  return (
    <TextField
      sx={{ width: '90%' }}
      label={label}
      required={required}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton edge='end'>
              <Checkbox
                color="primary"
              />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}