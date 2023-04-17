import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { GET_GAME_URL, HOST, getAuthHeader } from '../utils/utils';

export default function DashboardContent () {
  const [items, setItems] = useState([]);
  const oldsession = () => {
    fetch(`${HOST}${GET_GAME_URL}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setItems(res.quizzes)
    }).catch(error => {
      console.log(error.message)
    })
  }
  return (
    <Button onClick={oldsession()}>
        {items}
    </Button>

  )
}
