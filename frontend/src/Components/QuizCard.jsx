import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { checkValidQuiz, GET_GAME_URL, getAuthHeader, HOST } from '../utils/utils';
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { UpdateGameDTO } from '../utils/entities';
import CopyLinkDialog from './CopyLinkDialog';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function QuizCard ({ image, title, quizId, onDeleteSuccess }) {
  const navigate = useNavigate()

  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState('')

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmDialogContent, setConfirmDialogContent] = useState('')

  const [stopSuccessDialogOpen, setStopSuccessDialogOpen] = useState(false)

  const [copyLinkDialogOpen, setCopyLinkDialogOpen] = useState(false)
  const [copyLinkDialogContent, setCopyLinkDialogContent] = useState('')

  const [sessionId, setSessionId] = useState(null)
  const [started, setStarted] = useState(null)

  const [questionCount, setQuestionCount] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const [anchorEl, setAnchorEl] = useState(null)

  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
  }

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const closeStopSuccessDialog = () => {
    setStopSuccessDialogOpen(false)
  }

  const closeCopyLinkDialog = () => {
    setCopyLinkDialogOpen(false)
  }

  const onConfirmDialogConfirm = () => {
    setConfirmDialogOpen(false)
    deleteQuiz()
  }

  const openDeleteConfirmDialog = () => {
    setConfirmDialogContent(`Are you sure you want to delete game "${title}" ?`)
    setConfirmDialogOpen(true)
  }

  const openMoreButtonMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMoreButtonMenu = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setSessionId(res.active)
      setStarted(res.active !== null)
      setQuestionCount(res.questions.length)
      let sum = 0
      for (const question of res.questions) {
        sum += question.duration
      }
      setTotalDuration(sum)
    }).catch(error => {
      setAlertDialogContent(error.message)
      setAlertDialogOpen(true)
    })
  }, [])

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

  const stopQuiz = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}/end`, {
      method: 'POST',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setStopSuccessDialogOpen(true)
      setStarted(false)
    }).catch(error => {
      setAlertDialogContent(error.message)
      setAlertDialogOpen(true)
    })
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
          {questionCount === 0 || questionCount === 1 ? `${questionCount} Question` : `${questionCount} Questions`}
        </Typography>
        <Typography component='p' color='GrayText'>
          {totalDuration} Seconds
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, pl: 1, pr: 0 }}>
        <Button size='small' onClick={started ? getSessionId : startQuiz} >{started ? 'running' : 'start'}</Button>
        <Button size='small' onClick={stopQuiz} sx={{ display: started ? 'block' : 'none' }}>Stop</Button>
        <Button size='small' onClick={() => { navigate(`/admin/${quizId}/${sessionId}`) }} sx={{ display: started ? 'block' : 'none' }}>Admin</Button>
        <Box flexGrow={1} />
        <IconButton
          aria-controls='more-button-menu'
          aria-haspopup='true'
          onClick={openMoreButtonMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='more-button-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMoreButtonMenu}
        >
          <MenuItem onClick={() => {
            toEdit()
            closeMoreButtonMenu()
          }}>Edit</MenuItem>
          <MenuItem onClick={() => {
            openDeleteConfirmDialog()
            closeMoreButtonMenu()
          }}>Delete</MenuItem>
        </Menu>
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
      <ConfirmDialog
        open={stopSuccessDialogOpen}
        content={`Game "${title}" stopped. Do you want to view the result?`}
        onClose={closeStopSuccessDialog}
        onConfirm={closeStopSuccessDialog}
        confirmButtonContent='Yes'
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
