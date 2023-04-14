import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
import { removeToken, getToken } from '../utils/utils';

function Navbar () {
  const [pages, setPages] = useState(['Products', 'Pricing', 'Register', getToken() ? 'Login' : 'Logout'])
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();

  const navbarRef = useRef()

  useEffect(() => {
    if (navbarRef.current) {
      document.documentElement.style.setProperty(
        '--nav-h',
        `${navbarRef.current.offsetHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    updateLoginStatus();
  }, [location]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const updateLoginStatus = () => {
    setPages(getToken() ? ['Dashboard', 'Join', 'Register', 'Logout'] : ['Dashboard', 'Join', 'Register', 'Login'])
  }

  return (
    <AppBar position="static" ref={navbarRef}>
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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
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
            {pages.map((page) => (
              <Link href={page === 'Login' || page === 'Logout' ? 'login' : `/${page.toLowerCase()}`} key={page} sx={{ textDecoration: 'none' }} onClick={page === 'Logout' ? removeToken : null}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
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

export default Navbar
