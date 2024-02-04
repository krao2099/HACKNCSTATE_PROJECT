import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tree from './pages/Tree';
import ProfileCreationForm from './pages/ProfileCreationForm';
import MemoryCreationForm from './pages/MemoryCreationForm';
import Profile from './pages/Profile';
import RelationForm from './pages/RelationForm';
import Feed from './pages/Feed';
import AboutUs from './pages/about_us';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tree" element={<Tree />} />
        <Route path="/" element={<Tree />} />
        <Route path="/add_person" element={<ProfileCreationForm />} />
        <Route path="/add_memory" element={<MemoryCreationForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add_relation" element={<RelationForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}


export default App;
