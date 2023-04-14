import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register'
import Main from './Pages/Main';
import NavbarWrapper from './Components/NavbarWrapper';
import EditGame from './Pages/GameEdit.jsx';
import NotFound from './Pages/NotFound';
import { CssBaseline } from '@mui/material';
import GameResult from './Pages/GameResult.jsx';
import Join from './Pages/Join';
import PlayGame from './Pages/PlayGame';
import Admin from './Pages/Admin';

function App () {
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <NavbarWrapper>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='dashboard' element={<Main />} />

            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            <Route path='editgame/:quizId' element={<EditGame />} />

            <Route path='gameresult' element={<GameResult />} />

            <Route path='join' element={<Join />} />
            <Route path='join/:sessionId' element={<Join withSessionId={true}/>} />

            <Route path='play/:playerId' element={<PlayGame />} />
            <Route path='play' element={<NotFound />} />

            <Route path='notfound' element={<NotFound />} />
            <Route path='notfound/:status' element={<NotFound />} />

            <Route path='admin/:sessionId' element={<Admin />} />
            <Route path='admin' element={<NotFound />} />
          </Routes>
        </NavbarWrapper>
      </BrowserRouter>
    </div>
  )
}

export default App;
