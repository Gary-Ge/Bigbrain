import React, { useEffect, useState, useRef } from 'react';
import { Grid, TextField, Button, Hidden, AppBar, Toolbar, useTheme, useMediaQuery, List, Drawer, styled, Fab, ListItem, FormControl, InputLabel, Select, MenuItem, Typography, Divider, Box, InputAdornment } from '@mui/material';
import ImageDisplay from '../Components/ImageDisplay';
import CheckTextField from '../Components/CheckTextField';
import QuestionThumbnail from '../Components/QuestionThumbnail';
import { Add, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import AlertDialog from '../Components/AlertDialog';
import { GET_GAME_URL, HOST, getAuthHeader, fileToDataUrl, checkValidQuiz } from '../utils/utils';
import { UpdateGameDTO } from '../utils/entities';
import ConfirmDialog from '../Components/ConfirmDialog';

export default function EditGame () {
  const quizId = useParams().quizId
  const navigate = useNavigate()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const resourceUploadRef = useRef(null)

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
  const [confirmDialogState, setConfirmDialogState] = useState({
    open: false,
    content: 'This game is not able to be started because you have at least one required field incomplete.\n Note that Each question requires a title, at least two options (A and B) and at least one correct answer. In addition, please fill in the options in order, for example, you cannot only fill in option D and leave option C blank.\n Of course, we\'ve saved everything you\'ve filled in, so you can quit editing now and come back later to refine it.\n Are you sure you want to finish editing?'
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
  const [focusItem, setFocusItem] = useState(0)

  const [resourceTextStatus, setResourceTextStatus] = useState({
    resource: '',
    error: false,
    helperText: 'Paste youtube link here or upload image'
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
      setResourceTextStatus({ ...resourceTextStatus, resource: res.questions[0].resource.startsWith('https://') ? res.questions[0].resource : '' })
    }).catch(error => {
      if (error.message === 'Invalid quiz ID') {
        navigate('/notfound/1001')
      } else {
        setAlertDialogState({
          open: true,
          content: error.message
        })
      }
    })
  }, [])

  const onAlertDialogClose = () => {
    setAlertDialogState({ ...alertDialogState, open: false })
  }

  const onMarginDrawClose = () => {
    setMarginDrawOpen(false)
  }

  const openMarginDraw = () => {
    setMarginDrawOpen(true)
  }

  // Update game meta data
  const handleGameNameChange = (event) => {
    setGameState({ ...gameState, name: event.target.value })
  }

  // Update question meta data
  const handleGameTypeSelectorChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].type = event.target.value
    newQuestionLocal[focusItem].correct = newQuestionLocal[focusItem].correct.length === 0 ? [] : [newQuestionLocal[focusItem].correct[0]]
    setQuestionsLocal(newQuestionLocal)
    setQuestions(newQuestionLocal)
  }

  const handlePointsChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].points = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  const handleDurationChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].duration = event.target.value
    setQuestionsLocal(newQuestionLocal)
  }

  // Select question and delete question
  const handleQuestionClick = (index) => {
    setFocusItem(index)
    setResourceTextStatus({ ...resourceTextStatus, resource: questionsLocal[index].resource.startsWith('https://') ? questionsLocal[index].resource : '' })
  }

  const handleDeleteClick = (index) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal.splice(index, 1)
    if (focusItem > newQuestionLocal.length - 1) {
      setFocusItem(newQuestionLocal.length - 1)
      setResourceTextStatus({ ...resourceTextStatus, resource: newQuestionLocal[newQuestionLocal.length - 1].resource.startsWith('https://') ? newQuestionLocal[newQuestionLocal.length - 1].resource : '' })
    } else {
      setResourceTextStatus({ ...resourceTextStatus, resource: newQuestionLocal[focusItem].resource.startsWith('https://') ? newQuestionLocal[focusItem].resource : '' })
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

  // Update Question Answer Content
  const handleQuestionAnswerAChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].a = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('A'), 1)
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerBChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].b = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('B'), 1)
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerCChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].c = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('C'), 1)
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerDChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].d = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('D'), 1)
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerEChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].e = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('E'), 1)
    setQuestionsLocal(newQuestionLocal)
  }
  const handleQuestionAnswerFChange = (event) => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].f = event.target.value
    if (event.target.value === '') newQuestionLocal[focusItem].correct.splice(newQuestionLocal[focusItem].correct.indexOf('F'), 1)
    setQuestionsLocal(newQuestionLocal)
  }

  // Update Correct Answer
  const handleQuestionCheckChange = (event) => {
    const name = event.target.name
    const newQuestionLocal = [...questionsLocal]
    if (event.target.checked) {
      if (questionsLocal[focusItem].type === 'Single Choice') {
        newQuestionLocal[focusItem].correct = [name]
        setQuestionsLocal(newQuestionLocal)
        setQuestions(newQuestionLocal)
      } else {
        newQuestionLocal[focusItem].correct = [...newQuestionLocal[focusItem].correct, name]
        setQuestionsLocal(newQuestionLocal)
        setQuestions(newQuestionLocal)
      }
    } else {
      if (questionsLocal[focusItem].type === 'Single Choice') {
        newQuestionLocal[focusItem].correct = []
        setQuestionsLocal(newQuestionLocal)
        setQuestions(newQuestionLocal)
      } else {
        const newCorrect = [...newQuestionLocal[focusItem].correct]
        newCorrect.splice(newCorrect.indexOf(name), 1)
        newQuestionLocal[focusItem].correct = newCorrect
        setQuestionsLocal(newQuestionLocal)
        setQuestions(newQuestionLocal)
      }
    }
  }

  // Create question
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
      points: 10,
      resource: ''
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

  // Update question meta data
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
    } else if (value < 15) {
      newQuestionLocal[focusItem].duration = 30
      setQuestionsLocal(newQuestionLocal)
      setDurationTextState({
        error: true,
        helperText: 'Duration should at least be 15 seconds. Duration value has been set to the default value.'
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
    } else if (value < 0.1) {
      newQuestionLocal[focusItem].points = 10
      setQuestionsLocal(newQuestionLocal)
      setPointsTextState({
        error: true,
        helperText: 'Points should at least be 0.1. Points value has been set to the last valid value.'
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

  // Update resource
  const getResource = (resource) => {
    if (resource == null || resource === '') {
      return '/assets/no-resource.svg'
    } else if (resource.startsWith('data:image')) {
      return resource
    } else {
      return '/assets/video.svg'
    }
  }

  const onResourceInputChange = (event) => {
    setResourceTextStatus({ ...resourceTextStatus, resource: event.target.value })
  }

  const onResourceInputBlur = () => {
    if (resourceTextStatus.resource.startsWith('https://www.youtube.com/') || resourceTextStatus.resource.startsWith('https://youtu.be/')) {
      setResourceTextStatus({ ...resourceTextStatus, error: false, helperText: 'Paste youtube link here or upload image' })
      const newQuestionLocal = [...questionsLocal]
      newQuestionLocal[focusItem].resource = resourceTextStatus.resource
      setQuestionsLocal(newQuestionLocal)
      setQuestions(newQuestionLocal)
    } else if (resourceTextStatus.resource === '') {
      setResourceTextStatus({ ...resourceTextStatus, error: false, helperText: 'Paste youtube link here or upload image' })
    } else {
      setResourceTextStatus({ ...resourceTextStatus, error: true, helperText: 'The input link is not a valid youtube link' })
    }
  }

  const onClearResource = () => {
    const newQuestionLocal = [...questionsLocal]
    newQuestionLocal[focusItem].resource = ''
    setQuestionsLocal(newQuestionLocal)
    setQuestions(newQuestionLocal)
    setResourceTextStatus({ ...resourceTextStatus, resource: '' })
  }

  const openFileUploader = () => {
    resourceUploadRef.current.click()
  }

  const onUploadFileChange = (event) => {
    const file = event.target.files[0]
    if (file == null) return
    fileToDataUrl(file).then(res => {
      setResourceTextStatus({ resource: '', error: false, helperText: 'Paste youtube link here or upload image' })
      const newQuestionLocal = [...questionsLocal]
      newQuestionLocal[focusItem].resource = res
      setQuestionsLocal(newQuestionLocal)
      setQuestions(newQuestionLocal)
    }).catch(error => {
      setResourceTextStatus({ resource: '', error: true, helperText: error.message })
    })
    event.target.value = ''
  }

  const onClickResource = () => {
    if (questionsLocal[focusItem].resource.startsWith('https://')) {
      window.open(questionsLocal[focusItem].resource)
    }
  }

  // Finish Editing
  const onFinishEditing = () => {
    if (checkValidQuiz(questionsLocal)) {
      onConfirmFinishEditing()
    } else {
      setConfirmDialogState({ ...confirmDialogState, open: true })
    }
  }

  const onConfirmFinishEditing = () => {
    navigate('/dashboard')
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
          <Box
            sx={{ width: '90%' }}
            mt={4}
            mb={2}
          >
            <Box sx={{ display: 'none' }}>
              <input
                type='file'
                ref={resourceUploadRef}
                onChange={onUploadFileChange}
              />
            </Box>
            <TextField
              label={'Resource'}
              fullWidth
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button size='small' onClick={onClearResource}>Clear</Button>
                    <Button size='small' onClick={openFileUploader}>Upload</Button>
                  </InputAdornment>
                )
              }}
              value={resourceTextStatus.resource}
              onChange={onResourceInputChange}
              onBlur={onResourceInputBlur}
              error={resourceTextStatus.error}
              helperText={resourceTextStatus.helperText}
            >
            </TextField>
          </Box>
          <ImageDisplay
            minWidth={240}
            maxWidth={600}
            src={questionsLocal.length > 0 ? getResource(questionsLocal[focusItem].resource) : '/assets/no-resource.svg'}
            alt={'test'}
            onClick={onClickResource}
          />
          <Grid container mt={4} spacing={2} maxWidth={1400}>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'A (Required)'}
                required={true}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].a : ''}
                onChange={handleQuestionAnswerAChange}
                onBlur={saveQuestion}
                name={'A'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('A') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].a === '' : true}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'B (Required)'}
                required={true}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].b : ''}
                onChange={handleQuestionAnswerBChange}
                onBlur={saveQuestion}
                name={'B'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('B') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].b === '' : true}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'C'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].c : ''}
                onChange={handleQuestionAnswerCChange}
                onBlur={saveQuestion}
                name={'C'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('C') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].c === '' : true}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'D'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].d : ''}
                onChange={handleQuestionAnswerDChange}
                onBlur={saveQuestion}
                name={'D'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('D') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].d === '' : true}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'E'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].e : ''}
                onChange={handleQuestionAnswerEChange}
                onBlur={saveQuestion}
                name={'E'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('E') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].e === '' : true}
              />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField
                label={'F'}
                value={questionsLocal.length > 0 ? questionsLocal[focusItem].f : ''}
                onChange={handleQuestionAnswerFChange}
                onBlur={saveQuestion}
                name={'F'}
                onCheckBoxChange={handleQuestionCheckChange}
                checked={questionsLocal.length > 0 ? questionsLocal[focusItem].correct.includes('F') : false}
                checkBoxDisabled={questionsLocal.length > 0 ? questionsLocal[focusItem].f === '' : true}
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
            <ImageDisplay minWidth={217} maxWidth={217} src={'/assets/no-resource.svg'} alt={'test'} />
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
              onClick={onFinishEditing}
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
      <ConfirmDialog
        {...confirmDialogState}
        onClose={() => { setConfirmDialogState({ ...confirmDialogState, open: false }) }}
        onConfirm={() => {
          setConfirmDialogState({ ...confirmDialogState, open: false })
          onConfirmFinishEditing()
        }}
      >
      </ConfirmDialog>
    </>
  );
}
