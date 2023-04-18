import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Paper, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '../Components/AlertDialog';
import { GET_SESSION_URL, HOST, getAuthHeader, GET_GAME_URL } from '../utils/utils';
import CountDownProgress from '../Components/CountDownProgress';
import StopIcon from '@mui/icons-material/Stop';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashboardContent from '../Pages/GameResult';
export default function Admin () {
  const navigate = useNavigate()
  const sessionId = useParams().sessionId
  const quizId = useParams().quizId

  const timer = useRef(null)

  const [alertDialogState, setAlertDialogState] = useState({
    open: false,
    content: ''
  })
  const [sessionState, setSessionState] = useState(null)

  const [countdown, setCountdown] = useState(0)
  const [progress, setProgress] = useState(0)

  const updateSessionStatus = () => {
    fetch(`${HOST}${GET_SESSION_URL}/${sessionId}/status`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setSessionState(res.results)
      // If a question is in progress, set the timer
      if (res.results.active && res.results.position > -1 && res.results.position < res.results.questions.length) {
        startTimer(res.results.isoTimeLastQuestionStarted, res.results.questions[res.results.position].duration)
      }
    }).catch(error => {
      if (error.message === 'A system error ocurred') {
        navigate('/notfound/1003')
      } else {
        setAlertDialogState({
          open: true,
          content: error.message
        })
      }
    })
  }

  const startTimer = (lastStarted, duration) => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
    timer.current = setInterval(() => {
      const timeRemaining = duration * 1000 - new Date().getTime() + new Date(lastStarted).getTime()
      if (timeRemaining <= 0) {
        clearInterval(timer.current)
        timer.current = null
        setCountdown(0)
        setProgress(0)
      } else {
        console.log(timeRemaining)
        setCountdown(Math.ceil(timeRemaining / 1000))
        setProgress((100 / (duration * 1000)) * timeRemaining)
      }
    }, 100);
  }

  useEffect(() => {
    updateSessionStatus()

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [])

  const advance = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}/advance`, {
      method: 'POST',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      updateSessionStatus()
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }

  const endSession = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
    fetch(`${HOST}${GET_GAME_URL}/${quizId}/end`, {
      method: 'POST',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      updateSessionStatus()
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }

  return (
    <Container maxWidth='lg'>
      <CountDownProgress
        countdown={countdown}
        progress={progress}
        display={sessionState && sessionState.active && sessionState.position > -1 && sessionState.position < sessionState.questions.length}
      />
      {sessionState && sessionState.active
        ? (<Box
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minHeight='calc(100vh - var(--nav-h))'
            display={'flex'}
          >
          <Typography variant="h6" align='center' gutterBottom>
            {`Session ID: ${sessionId}`}
          </Typography>
          <Typography variant="h4" align='center' gutterBottom>
            {sessionState && sessionState.position > -1 && sessionState.position < sessionState.questions.length ? 'The quiz is started' : 'The quiz is not started yet'}
          </Typography>
          {sessionState && sessionState.position > -1 && sessionState.position < sessionState.questions.length &&
           (<Typography variant="h6" align='center'>
              Current: {sessionState.questions[sessionState.position].title}
            </Typography>)}
          <Paper
            elevation={3}
            sx={{
              maxWidth: 250,
              width: '100%',
              minHeight: 150,
              marginTop: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <IconButton
              sx={{
                fontSize: '5rem',
                width: '5rem',
                height: '5rem'
              }}
              data-testid='test-stop'
              onClick={endSession}
            >
              <StopIcon fontSize='5rem'/>
            </IconButton>
            {sessionState && sessionState.position < sessionState.questions.length &&
             (<IconButton
                sx={{
                  width: '2.5rem',
                  height: '2.5rem'
                }}
                onClick={advance}
                data-testid='test-advance'
              >
                <ArrowForwardIosIcon/>
              </IconButton>)}
          </Paper>
        </Box>)
        : (<DashboardContent sessionId={sessionId} quizId={quizId}/>)}
      <AlertDialog
        {...alertDialogState}
        onClose={() => setAlertDialogState({ ...alertDialogState, open: false })}
      >
      </AlertDialog>
    </Container>
  )
}
