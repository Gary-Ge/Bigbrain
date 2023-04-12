import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Hidden, AppBar, Toolbar, useTheme, useMediaQuery, List, Drawer, styled, Fab, ListItem, FormControl, InputLabel, Select, MenuItem, Typography, Divider } from '@mui/material';
import ImageDisplay from '../Components/ImageDisplay';
import CheckTextField from '../Components/CheckTextField';
import QuestionThumbnail from '../Components/QuestionThumbnail';
import { Add, ArrowBack } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import AlertDialog from '../Components/AlertDialog';
import { GET_GAME_URL, HOST, getAuthHeader } from '../utils/utils';
import { UpdateGameDTO } from '../utils/entities';

export default function EditGame () {
  const quizId = useParams().quizId

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const MarginDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '33%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '25%',
      },
      [theme.breakpoints.up('xl')]: {
        width: '17%',
      },
      marginTop: 'var(--nav-h)',
      boxSizing: 'border-box',
      backgroundColor: '#f5f5f5'
    },
  }));

  const [isMounted, setIsMounted] = useState(false)
  const [marginDrawOpen, setMarginDrawOpen] = useState(false)
  const [alertDialogState, setAlertDialogState] = useState({
    open: false,
    content: ''
  })

  const [questions, setQuestions] = useState([])
  const [questionsLocal, setQuestionsLocal] = useState([])

  const [gameState, setGameState] = useState({
    thumbnail: null,
    name: null
  })
  const [durationTextState, setDurationTextState] = useState({
    error: false,
    helperText: ''
  })
  const [pointsTextState, setPointsTextState] = useState({
    error: false,
    helperText: ''
  })

  useEffect(() => {
    if (isMounted) {
      updateGame()
    } else {
      setIsMounted(true)
    }
  }, [questions])

  useEffect(() => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setQuestions(res.questions)
      setQuestionsLocal(res.questions)
      setGameState({
        thumbnail: res.thumbnail,
        name: res.name
      })
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }, [])

  const [focusItem, setFocusItem] = useState(0)

  const onAlertDialogClose = () => {
    setAlertDialogState({ ...alertDialogState, open: false })
  }

  const onMarginDrawClose = () => {
    setMarginDrawOpen(false)
  }

  const openMarginDraw = () => {
    setMarginDrawOpen(true)
  }

  const handleGameTypeSelectorChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].type = event.target.value
    setQuestionsLocal(newQuestionLocal)
    saveQuestion()
  }

  const handleDurationChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].duration = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  const handleGameNameChange = (event) => {
    setGameState({ ...gameState, name: event.target.value })
  }

  const handlePointsChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].points = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  const handleQuestionClick = (index) => {
    setFocusItem(index)
  }

  const handleDeleteClick = (index) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal.splice(index, 1)
    if (focusItem > newQuestionLocal.length - 1) {
      setFocusItem(newQuestionLocal.length - 1)
    }
    setQuestionsLocal(newQuestionLocal)
    setQuestions(newQuestionLocal)
  }

  // Update Question Title
  const handleQuestionTitleChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].title = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  // Update Question Answer
  const handleQuestionAnswerAChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].a = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerBChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].b = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerCChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].c = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerDChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].d = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerEChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].e = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerFChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].f = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  const createQuestion = () => {
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
      points: 10
    }
    setQuestions([...questions, newQuestion])
    setQuestionsLocal([...questionsLocal, newQuestion])
  }

  const saveQuestion = () => {
    const newQuestions = [...questionsLocal]
    setQuestions(newQuestions)
  }

  const updateGame = () => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(new UpdateGameDTO(questions, gameState))
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
    }).catch(error => {
      setAlertDialogState({
        open: true,
        content: error.message
      })
    })
  }

  const handleDurationBlur = () => {
    const value = parseInt(questionsLocal[focusItem].duration)
    const newQuestionLocal = [...questionsLocal]
    if (isNaN(value)) {
      newQuestionLocal[focusItem].duration = 30
      setQuestionsLocal(newQuestionLocal)
      setDurationTextState({
        error: true,
        helperText: 'Duration should be a number. Duration value has been set to the default value.'
      })
    } else {
      newQuestionLocal[focusItem].duration = value
      setQuestionsLocal(newQuestionLocal)
      setDurationTextState({
        error: false,
        helperText: ''
      })
    }
    saveQuestion()
  }

  const handlePointsBlur = () => {
    const value = +(questionsLocal[focusItem].points)
    const newQuestionLocal = [...questionsLocal]
    if (isNaN(value)) {
      newQuestionLocal[focusItem].points = 10
      setQuestionsLocal(newQuestionLocal)
      setPointsTextState({
        error: true,
        helperText: 'Points should be a number. Points value has been set to the last valid value.'
      })
    } else {
      newQuestionLocal[focusItem].points = value
      setQuestionsLocal(newQuestionLocal)
      setPointsTextState({
        error: false,
        helperText: ''
      })
    }
    saveQuestion()
  }

  return (
    <>
      <Hidden mdUp>
        <AppBar position="fixed" color={'default'} sx={{ top: 'auto', bottom: 0, minHeight: 80 }}>
            <Toolbar>
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'auto',
                  width: '100%',
                  padding: 0
                }}
              >
                {questionsLocal.map((question, index) => (
                  <QuestionThumbnail
                    key={index}
                    text={question.title === '' || question.title == null ? `Q${index + 1}` : question.title}
                    width={100}
                    height={60}
                    onClick={() => handleQuestionClick(index)}
                    focused={focusItem === index}
                    onDeleteClick={() => handleDeleteClick(index)}
                    isDeletable={questionsLocal.length > 1}
                  />
                ))}
              </List>
              <Button
                sx={{
                  marginLeft: 1,
                  width: 50,
                  height: 50,
                  marginTop: 1
                }}
                variant='contained'
                onClick={createQuestion}
              >
                <Add />
              </Button>
            </Toolbar>
          </AppBar>
      </Hidden>
      <Hidden mdDown>
        <MarginDrawer
          sx={{
            flexShrink: 1
          }}
          variant='permanent'
          anchor='left'
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '80%',
              overflow: 'auto',
              width: '100%',
              padding: 0,
              marginTop: 1
            }}
          >
            {questionsLocal.map((question, index) => (
              <QuestionThumbnail
                key={index}
                text={question.title === '' || question.title == null ? `Question ${index + 1}` : question.title}
                width={'90%'}
                onClick={() => handleQuestionClick(index)}
                focused={focusItem === index}
                onDeleteClick={() => handleDeleteClick(index)}
                isDeletable={questionsLocal.length > 1}
              />
            ))}
            <Button
              sx={{
                marginLeft: 1,
                width: 50,
                height: 50
              }}
              variant='contained'
              onClick={createQuestion}
            >
              <Add />
            </Button>
          </List>
        </MarginDrawer>
      </Hidden>
      <Grid
        container
        height={'calc(100vh - var(--nav-h))'}
        display={'flex'}
        overflow={'auto'}
      >
        <Hidden mdDown>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            borderRadius={5}
            overflow={'auto'}
          >
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={9}
          xl={10}
          padding={2}
          flex={1}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ paddingBottom: isMobile ? theme.spacing(14) : 2 }}
        >
          <TextField
            required
            label='Question'
            fullWidth
            sx={{ maxWidth: 1400 }}
            value={questionsLocal.length > 0 ? questionsLocal[focusItem].title : ''}
            onChange={handleQuestionTitleChange}
            onBlur={saveQuestion}
          />
          <Button sx={{ margin: 4 }} variant='contained'>
            Upload/Update Resource
          </Button>
          <ImageDisplay maxWidth={600} src={'/assets/test-thumbnail.jpg'} alt={'test'} />
          <Grid container mt={4} spacing={2} maxWidth={1400}>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'A (Required)'}
                required={true}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].a : ''}
                onChange={handleQuestionAnswerAChange}
                onBlur={saveQuestion}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'B (Required)'}
                required={true}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].b : ''}
                onChange={handleQuestionAnswerBChange}
                onBlur={saveQuestion}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'C'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].c : ''}
                onChange={handleQuestionAnswerCChange}
                onBlur={saveQuestion}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'D'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].d : ''}
                onChange={handleQuestionAnswerDChange}
                onBlur={saveQuestion}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'E'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].e : ''}
                onChange={handleQuestionAnswerEChange}
                onBlur={saveQuestion}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'F'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].f : ''}
                onChange={handleQuestionAnswerFChange}
                onBlur={saveQuestion}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Fab
        color='default'
        size='small'
        sx={{
          position: 'fixed',
          right: '0',
          bottom: '50%',
          transform: 'translateY(50%)',
          borderRadius: '10px 0 0 10px',
          width: 30,
          height: 60
        }}
        onClick={openMarginDraw}
      >
        <ArrowBack>Add item</ArrowBack>
      </Fab>
      <Drawer
       anchor='right'
       open={marginDrawOpen}
       onClose={onMarginDrawClose}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            overflow: 'auto',
            width: 250,
          }}
        >
          <ListItem>
            <Typography>Game Setup</Typography>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label='Game Name'
              value={gameState.name}
              onChange={handleGameNameChange}
              onBlur={saveQuestion}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <ImageDisplay maxWidth={600} src={'/assets/test-thumbnail.jpg'} alt={'test'} />
          </ListItem>
          <ListItem>
            <Divider />
          </ListItem>
          <ListItem>
            <Typography>Current Question Setup</Typography>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Question Type</InputLabel>
              <Select
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].type : ''}
                label="Question Type"
                onChange={handleGameTypeSelectorChange}
              >
                <MenuItem value={'Single Choice'}>Single Choice</MenuItem>
                <MenuItem value={'Multi Choice'}>Multi Choice</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label='Duration (s)'
              value={questionsLocal.length > 0 ? questionsLocal[focusItem].duration : 30}
              onChange={handleDurationChange}
              onBlur={handleDurationBlur}
              {...durationTextState}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label='Points'
              value={questionsLocal.length > 0 ? questionsLocal[focusItem].points : 10}
              onChange={handlePointsChange}
              onBlur={handlePointsBlur}
              {...pointsTextState}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <Divider />
          </ListItem>
          <ListItem>
            <Button
              variant='contained'
              fullWidth
            >
              Finish Editing
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <AlertDialog
        {...alertDialogState}
        onClose={onAlertDialogClose}
      >
      </AlertDialog>
    </>
  );
}
