import React from 'react';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { css, Global } from '@emotion/react';

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
      <Login />
    </div>
  );
}

export default App;
