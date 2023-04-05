import * as React from 'react';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

class Main extends React.Component {
  render () {
    return !getToken()
      ? <Navigate to='/login' replace={true}/>
      : (
          <ThemeProvider theme={theme}>
            <Container
              sx={{
                height: '93vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography>This is the Main Page</Typography>
            </Container>
          </ThemeProvider>
        )
  }
}

export default Main
