import React from 'react';
import { Checkbox, FormControlLabel, Typography, Paper } from '@mui/material';

function LabelledCheckBox ({ label, checked, onChange, name, disabled, correct }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        marginBottom: 1,
        borderRadius: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: correct ? '#33eb91' : ''
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            color={'primary'}
            name={name}
            disabled={disabled}
          />
        }
        label={
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {label}
          </Typography>
        }
      />
    </Paper>
  )
}

export default LabelledCheckBox;
