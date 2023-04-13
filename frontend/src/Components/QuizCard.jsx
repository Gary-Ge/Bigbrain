import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkValidQuiz, GET_GAME_URL, getAuthHeader, HOST } from '../utils/utils';
import AlertDialog from './AlertDialog';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { UpdateGameDTO } from '../utils/entities';
import CopyLinkDialog from './CopyLinkDialog';

export default function QuizCard ({ image, title, questionNumber, quizId, onDeleteSuccess, active }) {
  const navigate = useNavigate()

  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState('')
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmDialogContent, setConfirmDialogContent] = useState('')

  const [copyLinkDialogOpen, setCopyLinkDialogOpen] = useState(false)
  const [copyLinkDialogContent, setCopyLinkDialogContent] = useState('')
  const [sessionId, setSessionId] = useState(null)

  const [started, setStarted] = useState(active)

  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
  }

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const closeCopyLinkDialog = () => {
    setCopyLinkDialogOpen(false)
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

  const startQuiz = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      if (!checkValidQuiz(res.questions)) {
        throw new Error('You cannot start this game since at least one of the questions is incomplete.')
      }
      startSession()
    }).catch(error => {
      setAlertDialogContent(error.message)
      setAlertDialogOpen(true)
    })
  }

  const startSession = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}/start`, {
      method: 'POST',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setStarted(true)
      getSessionId()
    }).catch(error => {
      if (error.message === 'Quiz already has active session') {
        getSessionId()
      } else {
        setAlertDialogContent(error.message)
        setAlertDialogOpen(true)
      }
    })
  }

  const getSessionId = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setCopyLinkDialogContent(`The quiz has been started! Session ID: ${res.active}`)
      setSessionId(res.active)
      setCopyLinkDialogOpen(true)
    }).catch(error => {
      setAlertDialogContent(error.message)
      setAlertDialogOpen(true)
    })
  }

  const onConfirmDialogConfirm = () => {
    setConfirmDialogOpen(false)
    deleteQuiz()
  }

  const openDeleteConfirmDialog = () => {
    setConfirmDialogContent(`Are you sure you want to delete game "${title}" ?`)
    setConfirmDialogOpen(true)
  }

  const toEdit = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      if (res.questions.length === 0) {
        createFirstQuestion(res.name, res.thumbnail, () => { navigate(`/editgame/${quizId}`) })
      } else {
        navigate(`/editgame/${quizId}`)
      }
    }).catch(error => {
      setAlertDialogOpen(true)
      setAlertDialogContent(error.message)
    })
  }

  const createFirstQuestion = (name, thumbnail, onSuccess) => {
    const newQuestion = {
      title: '',
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      correct: [],
      type: 'Single Choice',
      duration: 30,
      points: 10,
      resource: ''
    }
    const questions = [newQuestion]
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(new UpdateGameDTO(questions, {
        thumbnail,
        name
      }))
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      onSuccess()
    }).catch(error => {
      setAlertDialogOpen(true)
      setAlertDialogContent(error.message)
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
        <Button size='small' onClick={toEdit}>Edit</Button>
        <Button size='small' onClick={openDeleteConfirmDialog}>Delete</Button>
        <Button size='small' onClick={started ? getSessionId : startQuiz} >{started ? 'started' : 'start'}</Button>
      </CardActions>
      <AlertDialog
        open={alertDialogOpen}
        onClose={closeAlertDialog}
        content={alertDialogContent}
      >
      </AlertDialog>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={onConfirmDialogConfirm}
        content={confirmDialogContent}
      >
      </ConfirmDialog>
      <CopyLinkDialog
        open={copyLinkDialogOpen}
        content={copyLinkDialogContent}
        onClose={closeCopyLinkDialog}
        sessionId={sessionId}
      >
      </CopyLinkDialog>
    </Card>
  )
}
