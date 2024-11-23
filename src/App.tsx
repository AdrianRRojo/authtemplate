import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Register from './components/register';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Register} />
      </Routes>
    </Router>
  );
}

export default App;
