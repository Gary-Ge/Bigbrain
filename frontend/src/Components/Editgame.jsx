import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

function EditGame () {
  const [isCheckedA, setIsCheckedA] = useState(false);
  const [isCheckedB, setIsCheckedB] = useState(false);
  const [isCheckedC, setIsCheckedC] = useState(false);
  const [isCheckedD, setIsCheckedD] = useState(false);

  const handleCheckboxAChange = (event) => {
    setIsCheckedA(event.target.checked);
  };
  const handleCheckboxBChange = (event) => {
    setIsCheckedB(event.target.checked);
  };
  const handleCheckboxCChange = (event) => {
    setIsCheckedC(event.target.checked);
  };
  const handleCheckboxDChange = (event) => {
    setIsCheckedD(event.target.checked);
  };
  const type = [
    {
      value: 'single',
      label: 'Single Choice',
    },
    {
      value: 'multi',
      label: 'Multiple Choice',
    },
  ];

  const time = [
    {
      value: '5s',
      label: '5s',
    },
    {
      value: '10s',
      label: '10s',
    },
    {
      value: '20s',
      label: '20s',
    },
    {
      value: '30s',
      label: '30s',
    },
    {
      value: '1min',
      label: '1min',
    },
    {
      value: '1min30s',
      label: '1min30s',
    },
    {
      value: '2min',
      label: '2min',
    },
    {
      value: '3min',
      label: '3min',
    },
  ];
  const point = [
    {
      value: 'Standard',
      label: 'Standard',
    },
    {
      value: 'Double',
      label: 'Double',
    },
    {
      value: 'NaN',
      label: 'NaN',
    },
  ];

  const [questions, setQuestions] = useState([{ title: 'Question 1' }]);

  const addQuestion = () => {
    const newQuestion = { title: `Question ${questions.length + 1}` };
    setQuestions([...questions, newQuestion]);
  }
  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions.map((question, i) => ({ ...question, title: `Question ${i + 1}` })));
  }
  const [gameName, setGameName] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleOptionAChange = (event) => {
    setOptionA(event.target.value);
  };

  const handleOptionBChange = (event) => {
    setOptionB(event.target.value);
  };

  const handleOptionCChange = (event) => {
    setOptionC(event.target.value);
  };

  const handleOptionDChange = (event) => {
    setOptionD(event.target.value);
  };
  return (
    <Grid container sx={{ height: '93vh' }}>
  <Grid item xs={12} sm={6} md={3} lg={2} sx={{
  }} >
  {questions.map((question, index) => (
          <React.Fragment key={index}>
          <ListItem button>
        <ListItemText primary={question.title} />
        <Button variant='contained' color='error' onClick={() => deleteQuestion(index)} sx={{
          p: '0.3rem',
          fontSize: '0.25rem',
        }}>Delete</Button>
        </ListItem>
        <Divider />
          </React.Fragment>
  ))}
  <div style= {{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
  <Button onClick={addQuestion} variant="contained" color="success" >Create</Button>
  </div>
  </Grid>
  <Grid item xs={12} sm={6} md={6} lg={8} style={{ backgroundImage: 'url(assets/create-background.jpg)', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div style= {{ width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <FormControl fullWidth sx={{ m: 1, marginTop: '5%', backgroundColor: 'white', borderRadius: '10px' }}>
          <InputLabel sx={{ justifyContent: 'center' }} htmlFor="outlined-adornment-amount">Question</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Name"
            value={gameName}
            onChange={handleGameNameChange}
          />
    </FormControl>
    <Box
      component="form"
      style={{ marginTop: '5%' }}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch', marginTop: '10%' },
      }}
      noValidate
      autoComplete="off"
    >
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6}>
    <Box display="flex" alignItems="center" justifyContent="center">
    <TextField
      label="Option A"
      id="optionA"
      value={optionA}
      onChange={handleOptionAChange}
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              checked={isCheckedA}
              onChange={handleCheckboxAChange}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          </InputAdornment>
        ),
      }}
    />
    </Box>
    </Grid>
    <Grid item xs={6}>
    <Box display="flex" alignItems="center" justifyContent="center">
    <TextField
      label="Option B"
      id="optionB"
      value={optionB}
      onChange={handleOptionBChange}
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              checked={isCheckedB}
              onChange={handleCheckboxBChange}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          </InputAdornment>
        ),
      }}
    />
    </Box>
    </Grid>
    <Grid item xs={6}>
    <Box display="flex" alignItems="center" justifyContent="center">
    <TextField
      label="Option C"
      id="optionC"
      value={optionC}
      onChange={handleOptionCChange}
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              checked={isCheckedC}
              onChange={handleCheckboxCChange}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          </InputAdornment>
        ),
      }}
    />
    </Box>
    </Grid>
    <Grid item xs={6}>
    <Box display="flex" alignItems="center" justifyContent="center">
    <TextField
      label="Option D"
      id="optionD"
      value={optionD}
      onChange={handleOptionDChange}
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              checked={isCheckedD}
              onChange={handleCheckboxDChange}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          </InputAdornment>
        ),
      }}
    />
    </Box>
    </Grid>
    </Grid>
    </Box>
    </div>
  </Grid>
  <Grid item xs={12} sm={12} md={3} lg={2} style= {{ width: '95%', display: 'flex', marginTop: '2%' }}>
  <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Type"
          defaultValue="EUR"
          helperText="Please select your Question Type"
          style={{ width: '22ch' }}
        >
          {type.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Time"
          defaultValue="EUR"
          helperText="Please select your Limited Time"
          style={{ width: '22ch' }}
        >
          {time.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Points"
          defaultValue="EUR"
          helperText="Please select your Points"
          style={{ width: '22ch' }}
        >
          {point.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{ display: 'flex', marginTop: '10%', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant="contained" color="success" size='large' >Finish</Button>
      </div>
    </Box>
  </Grid>
</Grid>
  )
}
export default EditGame;
