import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tree from './pages/Tree';
import ProfileCreationForm from './pages/ProfileCreationForm';
import MemoryCreationForm from './pages/MemoryCreationForm';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tree" element={<Tree />} />
        <Route path="/" element={<Tree />} />
        <Route path="/add_person" element={<ProfileCreationForm />} />
        <Route path="/add_memory" element={<MemoryCreationForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}


export default App;
