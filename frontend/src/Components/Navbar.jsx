import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { removeToken } from '../utils/utils';

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pages: ['Products', 'Pricing', 'Register', 'Login'],
      anchorElNav: null
    }
    this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this)
    this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this)
    this.updateLoginStatus = this.updateLoginStatus.bind(this)
  }

  handleOpenNavMenu (event) {
    this.setState({
      anchorElNav: event.currentTarget
    })
  }

  handleCloseNavMenu () {
    this.setState({
      anchorElNav: null
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.updateLoginStatus();
    }
  }

  componentDidMount () {
    this.updateLoginStatus();
  }

  updateLoginStatus () {
    const token = localStorage.getItem('token');
    const pages = token
      ? ['Products', 'Pricing', 'Register', 'Logout']
      : ['Products', 'Pricing', 'Register', 'Login'];
    this.setState({ pages });
  }

  render () {
    return (
      <AppBar position="static">
        <Container maxWidth="xl" sx={{
        }}>
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                pr: 70,
                display: { xs: 'none', lg: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Big Brain
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(this.state.anchorElNav)}
                onClose={this.handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', lg: 'none' },
                }}
              >
                {this.state.pages.map((page) => (
                  <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                    <Link href={page === 'Login' || page === 'Logout' ? 'login' : `/${page.toLowerCase()}`} sx={{ textDecoration: 'none' }} onClick={page === 'Logout' ? removeToken : null}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 6,
                display: { xs: 'flex', lg: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Big Brain
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
              {this.state.pages.map((page) => (
                <Link href={page === 'Login' || page === 'Logout' ? 'login' : `/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none' }} onClick={page === 'Logout' ? removeToken : null}>
                  <Button
                    key={page}
                    onClick={this.handleCloseNavMenu}
                    sx={{ my: 2, mx: 5, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

export default Navbar
