import React from 'react';
import { Grid, TextField, Button, Hidden, AppBar, Toolbar, useTheme, useMediaQuery, List, Drawer, styled } from '@mui/material';
import ImageDisplay from '../Components/ImageDisplay';
import CheckTextField from '../Components/CheckTextField';
import QuestionThumbnail from '../Components/QuestionThumbnail';
import { Add } from '@mui/icons-material';

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
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
                <QuestionThumbnail text={'Item 1'} width={100} height={60} />
                <QuestionThumbnail text={'Item 2'} width={100} height={60} />
                <QuestionThumbnail text={'Item 3'} width={100} height={60} />
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
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
            <QuestionThumbnail text={'Item 1'} width={'90%'} />
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
              <CheckTextField label={'Answer 1'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'Answer 2'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'Answer 3'} />
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} alignItems='center' justifyContent={'center'}>
              <CheckTextField label={'Answer 4'} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
