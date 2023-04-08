import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register'
import Main from './Pages/Main';
import NavbarWrapper from './Components/NavbarWrapper';

function App () {
  return (
    <div>
      <Global
        styles={
          css`
            body {
              margin: 0
            }
          `
        }
      />
      <BrowserRouter>
        <NavbarWrapper>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='dashboard' element={<Main />} />
          </Routes>
        </NavbarWrapper>
      </BrowserRouter>
    </div>
  )
}

export default App;
