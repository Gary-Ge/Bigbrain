import * as React from 'react';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputAdornment } from '@mui/material';
import { CREATE_GAME_URL, HOST, getAuthHeader, GET_GAME_URL } from '../utils/utils';

export default function InputDialog ({ open, onClose, onSuccess }) {
  const fileUploadRef = useRef(null)

  const [textFieldStatus, setTextFieldStatus] = useState({
    error: false,
    helperText: ''
  })
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [gameUploaded, setGameUploaded] = useState(null)

  const onFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader();

    if (file == null) {
      return
    }

    if (file.type !== 'application/json') {
      setTextFieldStatus({
        error: true,
        helperText: 'Only JSON file is supported'
      })
      return
    }

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const game = JSON.parse(content);
        if (validQuestionData(game)) {
          setTextFieldStatus({ ...textFieldStatus, error: false, helperText: '' })
          setName(game.name)
          setDisabled(true)
          setGameUploaded(game)
        } else {
          setTextFieldStatus({
            error: true,
            helperText: 'The format of data in file is invalid'
          })
        }
      } catch (error) {
        setTextFieldStatus({
          error: true,
          helperText: error
        })
      }
    }

    reader.onerror = (error) => {
      setTextFieldStatus({
        error: true,
        helperText: error
      })
    }

    reader.readAsText(file)
    event.target.value = ''
  }

  const onNameChange = (event) => {
    setName(event.target.value)
    setTextFieldStatus({
      error: false,
      helperText: ''
    })
  }

  const onSubmit = () => {
    console.log(gameUploaded)
    if (gameUploaded === null && name === '') {
      setTextFieldStatus({
        error: true,
        helperText: 'Please input a name or upload a file'
      })
      return
    }
    setTextFieldStatus({
      error: false,
      helperText: ''
    })
    if (gameUploaded !== null) {
      onClose()
      createAndUpdateGame()
    } else if (name !== '') {
      onClose()
      createGame()
    }
  }

  const createAndUpdateGame = () => {
    fetch(`${HOST}${CREATE_GAME_URL}`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ name })
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      updateGame(res.quizId)
    }).catch(error => {
      console.log(error.message)
    })
  }

  const createGame = () => {
    fetch(`${HOST}${CREATE_GAME_URL}`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ name })
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      onClean()
      onSuccess()
    }).catch(error => {
      console.log(error.message)
    })
  }

  const updateGame = (quizId) => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(gameUploaded)
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      onClean()
      onSuccess()
    }).catch(error => {
      console.log(error.message)
    })
  }

  const onClean = () => {
    setGameUploaded(null)
    setDisabled(false)
    setName('')
  }

  const validQuestionData = (data) => {
    if (Object.keys(data).length !== 3 || data.questions === null || data.name === null || data.name === '' || !Object.keys(data).includes('thumbnail')) {
      return false
    }

    if (!Array.isArray(data.questions)) {
      return false
    }

    for (const question of data.questions) {
      if (Object.keys(question).length !== 12) return false

      if (question.title === null || question.a === null || question.b === null || question.c === null || question.d === null || question.e === null || question.f === null || question.correct === null || question.type === null || question.duration === null || question.points === null || question.resource === null) {
        return false
      }

      if (question.title === '') return false
      if (question.a === '' || question.b === '') return false
      if (question.d !== '' && question.c === '') return false
      if (question.e !== '' && (question.c === '' || question.d === '')) return false
      if (question.f !== '' && (question.c === '' || question.d === '' || question.e === '')) return false
      if (!Array.isArray(question.correct)) return false
      if (question.type !== 'Single Choice' && question.type !== 'Multi Choice') return false
      if (question.correct.length === 0) return false
      if (question.type === 'Single Choice' && question.correct.length > 1) return false
      if (question.correct.length > 6) return false

      const appeared = []
      for (const item of question.correct) {
        if (appeared.includes(item)) return false
        if (!['A', 'B', 'C', 'D', 'E', 'F'].includes(item)) return false
        if (item === 'C' && question.c === '') return false
        if (item === 'D' && question.d === '') return false
        if (item === 'E' && question.e === '') return false
        if (item === 'F' && question.f === '') return false
        appeared.push(item)
      }

      if (question.resource !== '' && !question.resource.startsWith('https://www.youtube.com/') && question.resource.startsWith('https://youtu.be/') && !question.resource.startsWith('data')) return false

      const duration = parseInt(question.duration)
      if (isNaN(duration)) return false
      if (duration < 15) return false

      question.duration = duration

      const points = +question.points
      if (isNaN(points)) return false
      if (points < 0.01) return false

      question.points = points
    }
    return true
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please input the name of the game to be created or upload a json file contining information of game.
        </DialogContentText>
        <TextField
          sx={{
            marginTop: 1
          }}
          autoFocus
          id="game-name"
          type="text"
          variant="standard"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button size='small' onClick={onClean}>Clear</Button>
                <Button size='small' onClick={() => { fileUploadRef.current.click() }}>upload</Button>
              </InputAdornment>
            )
          }}
          {...textFieldStatus}
          value={name}
          disabled={disabled}
          onChange={onNameChange}
        >
        </TextField>
        <Box display={'none'}>
          <input
            type='file'
            ref={fileUploadRef}
            onChange={onFileChange}
          ></input>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          onClean()
          onClose()
        }}>Cancel</Button>
        <Button onClick={onSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
