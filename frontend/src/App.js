import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tree from './pages/Tree';
import ProfileCreationForm from './pages/ProfileCreationForm';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tree" element={<Tree />} />
        <Route path="/" element={<Tree />} />
        <Route path="/add_person" element={<ProfileCreationForm />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}


export default App;
