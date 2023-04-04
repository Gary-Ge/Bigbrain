import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { validEmail, validNotNull, HOST, REGISTER_URL, saveToken, HEADER } from '../utils/utils';
import { RegisterDTO } from '../utils/entities';

const theme = createTheme();

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validEmail: true,
      validPassword: true,
      validName: true,
      emailHelperText: '',
      passwordHelperText: '',
      nameHelperText: ''
    }
    this.checkEmail = this.checkEmail.bind(this)
    this.checkNotNullName = this.checkNotNullName.bind(this)
    this.checkNotNullPassword = this.checkNotNullPassword.bind(this)
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

  checkNotNullPassword (event) {
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

  checkNotNullName (event) {
    if (!validNotNull(event.target.value)) {
      this.setState({
        validName: false,
        nameHelperText: 'Please input a valid username'
      })
    } else {
      this.setState({
        validName: true,
        nameHelperText: ''
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validNotNull(data.get('name'))) {
      this.setState({
        validName: false,
        nameHelperText: 'Please input a valid name'
      })
      return
    } else if (!validEmail(data.get('email'))) {
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

    const dto = new RegisterDTO(data.get('name'), data.get('email'), data.get('password'))

    fetch(`${HOST}${REGISTER_URL}`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: HEADER
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      saveToken(res.token)
    }).catch(error => {
      console.log(error.message)
    })
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
            <Container component="main" maxWidth='xs'>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="username"
                    id="name"
                    autoComplete="username"
                    onBlur={this.checkNotNullName}
                    error={!this.state.validName}
                    helperText={this.state.nameHelperText}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    onBlur={this.checkNotNullPassword}
                    error={!this.state.validPassword}
                    helperText={this.state.passwordHelperText}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
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

export default Register;
