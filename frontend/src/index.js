import ReactDOM from 'react-dom';
import Auth from './Auth';
import React from 'react';
import App from './App';
import Crud from './Crud';


ReactDOM.render(
  <Auth>
    <Crud>
      <App />
    </Crud>
  </Auth>

  , document.getElementById('root')
);

