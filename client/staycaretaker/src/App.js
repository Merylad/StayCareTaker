import logo from './logo.jpg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {createContext, useState} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login.js';
import Register from './components/Register';
import Accomodations from './components/Accomodations';
import Cockpit from './components/Cockpit';
import Charges from './components/Charges';
import Clients from './components/Clients';

export const AppContext = createContext()


function App() {
  const [token, setToken]= useState(null)
  return (
    <>
    <AppContext.Provider value = {{token, setToken}}>
      <Nav />
      <img src = {logo} alt='logo' style={{width : '100%'}}/>
      <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/accomodations' element = {<Accomodations/>} />
          <Route path = '/cockpit' element = {<Cockpit/>} />
          <Route path = '/charges' element = {<Charges/>} />
          <Route path = '/clients' element = {<Clients/>} />
        </Routes>
    </AppContext.Provider>
    </>
  );
}

export default App;
