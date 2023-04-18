import React, { useState, useEffect } from 'react';
import { GET_GAME_URL, HOST, getAuthHeader } from '../utils/utils';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function PastResult () {
  const [items, setItems] = useState([]);
  const quizId = useParams().quizId;

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setItems(res.oldSessions)
    }).catch(error => {
      console.log(error.message)
    })
  }, [quizId])
  console.log(items)
  function renderRow (items) {
    if (!items || items.length === 0) {
      console.log('Error: items is empty or undefined');
      return [];
    }
    return (
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        margin: 'auto',
        display: 'block',
        overflow: 'auto'
      }} >
          {items.map((row, index) => (
        <ListItemButton key={row} onClick={() => navigate(`/admin/${quizId}/${row}`)} sx={{ textAlign: 'center' }}>
            <ListItemText primary={`Session ${index + 1}: ${row}`} />
        </ListItemButton>
          ))}
      </List>
    );
  }
  return (
    <Box maxWidth="100%" sx={{ p: 3, overflow: 'auto', maxHeight: 'calc(100vh - var(--nav-h))' }} >
      <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(226, 230, 235)', overflow: 'auto' }}>
        {renderRow(items)}
      </Paper>
    </Box>

  )
}
