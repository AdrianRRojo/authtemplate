import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Register from './pages/register';
import Landing from './pages/landing';
import Account from './pages/account';
import Nav from './pages/nav';
import Login from './pages/login';
import Cookies from 'js-cookie';

function App() {
  const getCookie = Cookies.get('Login');
  return (
    
    <Router>
      <Nav />
      <Routes>
        {getCookie ? <Route path="/" Component={Landing} /> : <Route path="/" Component={Register} />}
          <Route path="/login" Component={Login} />
          <Route path="/" Component={Landing} /> 
          <Route path="/account" Component={Account} /> 
          <Route path="/register" Component={Register} />
        {/* <Route path="/" Component={Register} /> */}
      </Routes>
    </Router>
  );
}

export default App;
