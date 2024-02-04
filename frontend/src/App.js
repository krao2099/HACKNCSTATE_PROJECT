import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tree from './pages/Tree';
import ProfileCreationForm from './pages/ProfileCreationForm';
import Profile from './pages/Profile';
import RelationForm from './pages/RelationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tree" element={<Tree />} />
        <Route path="/" element={<Tree />} />
        <Route path="/add_person" element={<ProfileCreationForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add_relation" element={<RelationForm />} />
      </Routes>
    </Router>
  );
}


export default App;
