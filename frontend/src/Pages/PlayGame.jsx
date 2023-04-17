import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, Grid, Table, TableHead, TableRow, TableCell } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADER, HOST, PLAY_GAME_URL } from '../utils/utils';
import LabelledCheckBox from '../Components/LabelledCheckBox';
import CountDownProgress from '../Components/CountDownProgress';
import YoutubePlayer from '../Components/YoutubePlayer';
import ImageDisplay from '../Components/ImageDisplay';
import ImageSlide from '../Components/ImageSlide';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
export function Title (props) {
  return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', fontSize: '30px' }}>
        {props.children}
      </Typography>
  );
}
Title.propTypes = {
  children: PropTypes.node,
};

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

  const [points, setPoints] = useState([])
  const [durations, setDurations] = useState([])
  const [items, setItems] = useState([])

  const lastQuestionTimeRef = useRef(null)
  // Check if the playerID is valid
  useEffect(() => {
    getQuizStatus()
    statusTimer.current = setInterval(() => {
      getQuizStatus()
    }, 100)

    return () => {
      if (statusTimer.current) {
        clearInterval(statusTimer.current);
      }
    }
  }, [])

  useEffect(() => {
    console.log(points)
  }, [points])

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
        getResult()
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
      if (lastQuestionTimeRef.current === null || lastQuestionTimeRef.current !== res.question.isoTimeLastQuestionStarted) {
        lastQuestionTimeRef.current = res.question.isoTimeLastQuestionStarted
        setQuestion(res.question)
        setAnswer([])
        setCorrectAnswer([])
        setDisabled(false)
        startTimer(res.question.isoTimeLastQuestionStarted, res.question.duration)
        setPoints((prevPoints) => [...prevPoints, res.question.points])
        setDurations((prevDurations) => [...prevDurations, res.question.duration])
      }
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
        }, 100)
      } else {
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

  const getResult = () => {
    fetch(`${HOST}${PLAY_GAME_URL}/${playerId}/results`, {
      method: 'GET',
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setItems(res)
    }).catch(error => {
      console.log(error.message)
    })
  }
  function table (durations, points, items) {
    if (!items || items.length === 0) {
      console.log('Error: items is empty or undefined');
      return [];
    }
    if (!points || points.length === 0) {
      console.log('Error: point is empty or undefined');
      return [];
    }
    if (!durations || durations.length === 0) {
      console.log('Error: durations is empty or undefined');
      return [];
    }
    const Time = [];
    const numQuestions = items.length;
    const totalscore = []
    for (let questionId = 0; questionId < numQuestions; questionId++) {
      Time.push(questionId - questionId)
    }
    for (let questionId = 0; questionId < numQuestions; questionId++) {
      totalscore.push(questionId - questionId)
    }
    for (let answerId = 0; answerId < numQuestions; answerId++) {
      Time[answerId] += ((new Date(items[answerId].answeredAt).getTime() / 1000) - (new Date(items[answerId].questionStartedAt).getTime() / 1000));
      if (items[answerId].correct === true) {
        totalscore[answerId] += (1 - ((new Date(items[answerId].answeredAt).getTime() / 1000) - (new Date(items[answerId].questionStartedAt).getTime() / 1000)) / durations[answerId]) * points[answerId];
      }
    }
    const questionScores = Time.map((time, index) => [time, totalscore[index]]);
    return questionScores
  }
  console.log(table(durations, points, items))
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
        padding={started === 'Not Started' ? 0 : 2}
        minHeight='calc(100vh - var(--nav-h))'
      >
        {started === 'Not Started' &&
          (
            <>
              <ImageSlide playerId={playerId}/>
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
              {question && question.resource !== '' && question.resource.startsWith('https://youtu.be') &&
                (
                  <YoutubePlayer videoId={question.resource.split('/').pop()} />
                )
              }
              {question && question.resource !== '' && question.resource.startsWith('https://www.youtube.com') &&
                (
                  <YoutubePlayer videoId={question.resource.split('=').pop()} />
                )
              }
              {question && question.resource !== '' && question.resource.startsWith('data') &&
                (
                  <ImageDisplay
                    minWidth={240}
                    maxWidth={600}
                    src={question.resource}
                    alt={'test'}
                  />
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
          <TableContainer component={Paper}>
          <Title>Game Results</Title>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table(durations, points, items).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row[0].toFixed(2)}</TableCell>
                  <TableCell>{row[1].toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          <Typography component="h2" variant="h6" gutterBottom style={{ marginTop: '5%', fontSize: '12px', textAlign: 'left' }}>
              Score Calculation Formula: (Remaining answer time/each question total time)*each question total score
          </Typography>
          </>
          )
        }
      </Box>
    </Container>
  )
}
