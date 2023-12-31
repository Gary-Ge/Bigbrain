import * as React from 'react'
import { TextField, InputAdornment, IconButton, Checkbox } from '@mui/material'

export default function CheckTextField ({ label, required = false, value, onChange, onBlur, name, onCheckBoxChange, checked = false, checkBoxDisabled = false }) {
  return (
    <TextField
      data-testid={`textfield-${name}`}
      sx={{ width: '90%' }}
      label={label}
      required={required}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton edge='end'>
              <Checkbox
                color="primary"
                onChange={onCheckBoxChange}
                name={name}
                checked={checked}
                disabled={checkBoxDisabled}
                data-testid={`checkbox-${name}`}
              />
            </IconButton>
          </InputAdornment>
        )
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
