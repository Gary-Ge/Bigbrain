import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADER, HOST, PLAY_GAME_URL } from '../utils/utils';
import LabelledCheckBox from '../Components/LabelledCheckBox';
import CountDownProgress from '../Components/CountDownProgress';

export default function PlayGame () {
  const playerId = useParams().playerId
  const navigate = useNavigate()
  const [started, setStarted] = useState('Not Started')
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState([])

  const statusTimer = useRef(null)
  const timer = useRef(null)

  const [countdown, setCountdown] = useState(0)
  const [progress, setProgress] = useState(0)

  const [disabled, setDisabled] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState([])

  // Check if the playerID is valid
  useEffect(() => {
    getQuizStatus()
    statusTimer.current = setInterval(() => {
      getQuizStatus()
    }, 1000)

    return () => {
      if (statusTimer.current) {
        clearInterval(statusTimer.current);
      }
    }
  }, [])

  const getQuizStatus = () => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/status`, {
      method: 'GET',
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      if (res.started) {
        setStarted('Started')
        getCurrentQuestion()
      } else {
        setStarted('Not Started')
      }
    }).catch(error => {
      if (error.message === 'Player ID does not refer to valid player id') {
        navigate('/notfound/1002')
      } else if (error.message === 'Session ID is not an active session') {
        setStarted('Finished')
        clearInterval(statusTimer.current)
        clearInterval(timer.current)
      }
      console.log(error.message)
    })
  }

  const getCurrentQuestion = () => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/question`, {
      method: 'GET',
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setQuestion((prevQuestion) => {
        if (prevQuestion === null || prevQuestion.isoTimeLastQuestionStarted !== res.question.isoTimeLastQuestionStarted) {
          setAnswer([])
          setCorrectAnswer([])
          setDisabled(false)
          startTimer(res.question.isoTimeLastQuestionStarted, res.question.duration)
          return res.question
        }
        return prevQuestion
      })
    }).catch(error => {
      if (error.message === 'Player ID does not refer to valid player id') {
        navigate('/notfound/1002')
      } else if (error.message === 'Session ID is not an active session') {
        setStarted('Finished')
      }
      console.log(error.message)
    })
  }

  const onCheckBoxChange = (event) => {
    const checked = event.target.checked
    const name = event.target.name
    if (question.type === 'Single Choice') {
      if (checked) {
        setAnswer([name])
        submitAnswer([name])
      } else {
        setAnswer([])
      }
    } else {
      if (checked) {
        const newAnswer = [...answer, name]
        setAnswer(newAnswer)
        submitAnswer(newAnswer)
      } else {
        const newAnswer = [...answer]
        newAnswer.splice(newAnswer.indexOf(name), 1)
        setAnswer(newAnswer)
        submitAnswer(newAnswer)
      }
    }
  }

  const submitAnswer = (answer) => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/answer`, {
      method: 'PUT',
      headers: HEADER,
      body: JSON.stringify({ answerIds: answer.sort() })
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
    }).catch(error => {
      console.log(error.message)
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
        setDisabled(true)
        setTimeout(() => {
          getCorrectAnswer()
        })
      } else {
        console.log(timeRemaining)
        setCountdown(Math.ceil(timeRemaining / 1000))
        setProgress((100 / (duration * 1000)) * timeRemaining)
      }
    }, 100);
  }

  const getCorrectAnswer = () => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/answer`, {
      method: 'GET',
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setCorrectAnswer(res.answerIds)
    }).catch(error => {
      console.log(error.message)
    })
  }

  return (
    <Container maxWidth='xl' sx={{
      overflow: 'auto',
      height: 'calc(100vh - var(--nav-h))'
    }}>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        display='flex'
        overflow={'auto'}
        padding={2}
        minHeight='calc(100vh - var(--nav-h))'
      >
        {started === 'Not Started' &&
          (
            <>
              <Typography variant="h5" align='center' gutterBottom>
                {`Your player ID is ${playerId}.`}
              </Typography>
              <Typography variant="h3" align='center' gutterBottom>
                The game has not started yet, please wait
              </Typography>
            </>
          )
        }
        {started === 'Started' &&
         (<CountDownProgress
            countdown={countdown}
            progress={progress}
            display={true}
          />)}
        {started === 'Started' &&
          (
            <>
              <Typography variant='h5' align='center' gutterBottom>
                {question ? question.title : ''}
              </Typography>
              <Typography variant='body1' align='center' color={'GrayText'} gutterBottom>
                {question ? question.type : ''}
              </Typography>
              {disabled &&
                (
                  <Typography variant='h6' align='center' gutterBottom>
                    Timeout! Correct answer is/are marked as green!
                  </Typography>
                )
              }
              <Grid container mt={5} spacing={2} maxWidth={1200}>
                <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                  <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                    <LabelledCheckBox
                      label={question ? question.a : ''}
                      checked={answer.includes('A')}
                      name={'A'}
                      onChange={onCheckBoxChange}
                      disabled={disabled}
                      correct={correctAnswer.includes('A')}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                  <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                    <LabelledCheckBox
                      label={question ? question.b : ''}
                      checked={answer.includes('B')}
                      name={'B'}
                      onChange={onCheckBoxChange}
                      disabled={disabled}
                      correct={correctAnswer.includes('B')}
                    />
                  </Box>
                </Grid>
                {question && question.c !== '' &&
                  (
                    <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                      <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                        <LabelledCheckBox
                          label={question ? question.c : ''}
                          checked={answer.includes('C')}
                          name={'C'}
                          onChange={onCheckBoxChange}
                          disabled={disabled}
                          correct={correctAnswer.includes('C')}
                        />
                      </Box>
                    </Grid>
                  )
                }
                {question && question.d !== '' &&
                  (
                    <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                      <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                        <LabelledCheckBox
                          label={question ? question.d : ''}
                          checked={answer.includes('D')}
                          name={'D'}
                          onChange={onCheckBoxChange}
                          disabled={disabled}
                          correct={correctAnswer.includes('D')}
                        />
                      </Box>
                    </Grid>
                  )
                }
                {question && question.e !== '' &&
                  (
                    <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                      <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                        <LabelledCheckBox
                          label={question ? question.e : ''}
                          checked={answer.includes('E')}
                          name={'E'}
                          onChange={onCheckBoxChange}
                          disabled={disabled}
                          correct={correctAnswer.includes('E')}
                        />
                      </Box>
                    </Grid>
                  )
                }
                {question && question.f !== '' &&
                  (
                    <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
                      <Box height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                        <LabelledCheckBox
                          label={question ? question.f : ''}
                          checked={answer.includes('F')}
                          name={'F'}
                          onChange={onCheckBoxChange}
                          disabled={disabled}
                          correct={correctAnswer.includes('F')}
                        />
                      </Box>
                    </Grid>
                  )
                }
              </Grid>
            </>
          )
        }
        {started === 'Finished' &&
          (
            <>
              <Typography variant="h5" align='center' gutterBottom>
                {`Your player ID is ${playerId}.`}
              </Typography>
              <Typography variant="h5" align='center' gutterBottom>
                The game is finished
              </Typography>
            </>
          )
        }
      </Box>
    </Container>
  )
}
