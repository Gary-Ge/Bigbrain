import React, { useState } from 'react';
import { Grid, TextField, Button, Hidden, AppBar, Toolbar, useTheme, useMediaQuery, List, Drawer, styled, Fab, ListItem, FormControl, InputLabel, Select, MenuItem, Typography, Divider } from '@mui/material';
import ImageDisplay from '../Components/ImageDisplay';
import CheckTextField from '../Components/CheckTextField';
import QuestionThumbnail from '../Components/QuestionThumbnail';
import { Add, ArrowBack } from '@mui/icons-material';

export default function EditGame () {
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

  const [marginDrawOpen, setMarginDrawOpen] = useState(false)
  const [questionType, setQuestionType] = useState('Single Choice')
  const [questionDuration, setQuestionDuration] = useState('30')
  const [questionPoints, setQuestionPoints] = useState(10)
  const [gameName, setGameName] = useState('Default Name')

  const onMarginDrawClose = () => {
    setMarginDrawOpen(false)
  }

  const openMarginDraw = () => {
    setMarginDrawOpen(true)
  }

  const handleGameTypeSelectorChange = (event) => {
    setQuestionType(event.target.value)
  }

  const handleDurationChange = (event) => {
    setQuestionDuration(event.target.value)
  }

  const handleGameNameChange = (event) => {
    setGameName(event.target.value)
  }

  const handlePointsChange = (event) => {
    setQuestionPoints(event.target.value)
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
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
              </List>
              <Button
                sx={{
                  marginLeft: 1,
                  width: 50,
                  height: 50
                }}
                variant='contained'
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
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <Button
              sx={{
                marginLeft: 1,
                width: 50,
                height: 50
              }}
              variant='contained'
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
          />
          <Button sx={{ margin: 4 }} variant='contained'>
            Upload/Update Resource
          </Button>
          <ImageDisplay maxWidth={600} src={'assets/test-thumbnail.jpg'} alt={'test'} />
          <Grid container mt={4} spacing={2} maxWidth={1400}>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'A (Required)'} required={true} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'B (Required)'} required={true} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'C'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'D'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'E'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'F'} />
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
              value={gameName}
              onChange={handleGameNameChange}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <ImageDisplay maxWidth={600} src={'assets/test-thumbnail.jpg'} alt={'test'} />
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
                value={questionType}
                label="Question Type"
                onChange={handleGameTypeSelectorChange}
              >
                <MenuItem value={'Single Choice'}>Single Choice</MenuItem>
                <MenuItem value={'Multi Chouce'}>Multi Choice</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label='Duration (s)'
              value={questionDuration}
              onChange={handleDurationChange}
            >
            </TextField>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label='Points'
              value={questionPoints}
              onChange={handlePointsChange}
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
    </>
  );
}
