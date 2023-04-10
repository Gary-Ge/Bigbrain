import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GET_GAME_URL, getAuthHeader, HOST } from '../utils/utils';
import AlertDialog from './AlertDialog';
import { useState } from 'react';
import Link from '@mui/material/Link';

export default function QuizCard ({ image, title, questionNumber, quizId, onDeleteSuccess }) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState('')

  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
  }

  const deleteQuiz = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      onDeleteSuccess()
    }).catch(error => {
      setAlertDialogContent(error.message)
      setAlertDialogOpen(true)
    })
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        sx={{ height: 175 }}
        image={image}
      >
      </CardMedia>
      <CardContent sx={{ pb: 0, pt: 1, flexGrow: 1 }}>
        <Typography component='h4' variant='h5' sx={{ wordWrap: 'break-word', overflowWrap: 'break-word', }}>
          {title}
        </Typography>
        <Typography component='p' color='GrayText'>
          {questionNumber} Questions
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, pl: 0, pr: 0 }}>
      <Link href="/editgame" style={{ textDecoration: 'none' }} >
        <Button size='small'>Edit</Button>
      </Link>
        <Button size='small' onClick={deleteQuiz}>Delete</Button>
      </CardActions>
      <AlertDialog
        open={alertDialogOpen}
        onClose={closeAlertDialog}
        content={alertDialogContent}
      >
      </AlertDialog>
    </Card>
  )
}
