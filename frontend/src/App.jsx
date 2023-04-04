import React from 'react';
import Navbar from './Components/Navbar';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register'

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
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
