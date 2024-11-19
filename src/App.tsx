import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './components/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/landing/:id" component={Landing}
      </Routes>
    </Router>
  );
}

export default App;
