import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { validEmail, validNotNull } from '../utils/utils';

const theme = createTheme();

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validEmail: true,
      validPassword: true,
      emailHelperText: '',
      passwordHelperText: ''
    }
    this.checkEmail = this.checkEmail.bind(this)
    this.checkNotNull = this.checkNotNull.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  checkEmail (event) {
    if (!validEmail(event.target.value)) {
      this.setState({
        validEmail: false,
        emailHelperText: 'Please input a valid email address',
      })
    } else {
      this.setState({
        validEmail: true,
        emailHelperText: ''
      })
    }
  }

  checkNotNull (event) {
    if (!validNotNull(event.target.value)) {
      this.setState({
        validPassword: false,
        passwordHelperText: 'Please input a valid password'
      })
    } else {
      this.setState({
        validPassword: true,
        passwordHelperText: ''
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validEmail(data.get('email'))) {
      this.setState({
        validEmail: false,
        emailHelperText: 'Please input a valid email address',
      })
      return
    } else if (!validNotNull(data.get('password'))) {
      this.setState({
        validPassword: false,
        passwordHelperText: 'Please input a valid password'
      })
      return
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Grid container sx={{
          height: '93vh'
        }}>
          <Grid item xs={false} sm={false} md={7} sx={{
            backgroundImage: 'url(assets/login-background.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          </Grid>
          <Grid item xs={12} sm={12} md={5} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Container component="main">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.checkEmail}
                    onBlur={this.checkEmail}
                    error={!this.state.validEmail}
                    helperText={this.state.emailHelperText}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.checkNotNull}
                    onBlur={this.checkNotNull}
                    error={!this.state.validPassword}
                    helperText={this.state.passwordHelperText}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
}

export default Login
