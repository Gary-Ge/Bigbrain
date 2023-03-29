import React from 'react';
import Login from './Components/Login';
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
      <Login />
    </div>
  );
}

export default App;
