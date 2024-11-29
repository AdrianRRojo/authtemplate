import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Register from './components/register';
import Landing from './components/Landing';
import Login from './components/login';
import Cookies from 'js-cookie';

function App() {
  const getCookie = Cookies.get('Login');
  return (
    <Router>
      <Routes>
        {getCookie ? <Route path="/home" Component={Landing} /> : <Route path="/register" Component={Register} />}
          <Route path="/login" Component={Login} />
        {/* <Route path="/" Component={Register} /> */}
      </Routes>
    </Router>
  );
}

export default App;
