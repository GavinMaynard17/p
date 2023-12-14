import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import Contact from './pages/contact/Contact';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes path='/'>
          <Route path="about" element={<About/>} />
          <Route path="projects" element={<Projects/>} />
          <Route path="contact" element={<Contact/>} />
          <Route index element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
