import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import "./App.css"

// import component
import Home from './views/app/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

function App() {
  console.log("app.js render")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<Signup/>}></Route>
        <Route path='/' element = {<Home/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
