import logo from './logo.jpg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {createContext, useState, useEffect} from 'react';

import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login.js';
import Register from './components/Register';
import Accomodations from './components/Accomodations';
import Agenda from './components/Agenda';
import Charges from './components/Charges';
import Clients from './components/Clients';
import AddClient from './components/AddClient';

export const AppContext = createContext()


function App() {
  const [token, setToken]= useState(null);
  const [user_id, setUser_id] = useState('')
  const [firstname, setFirstname] = useState('')
  const [username, setUsername] = useState('')

  return (
    <>
    <AppContext.Provider value = {{token, setToken, setUser_id, user_id}}>
      <Nav />
      <img src = {logo} alt='logo' style={{width : '100%'}}/>
      <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/accomodations' element = {<Accomodations/>} />
          <Route path = '/agenda' element = {<Agenda/>} />
          <Route path = '/charges' element = {<Charges/>} />
          <Route path = '/clients' element = {<Clients/>} />
          <Route path = '/addclient' element = {<AddClient/>} />
        </Routes>
    </AppContext.Provider>
    </>
  );
}

export default App;
