import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import ProjectDetails from './pages/project-details/ProjectDetails';
import Contact from './pages/contact/Contact';
import Apps from './pages/apps/Apps';
import Test from './pages/testing/Test';
import BracketBuddy from './pages/apps/bracket-buddy/BracketBuddy';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes path='/'>
          <Route path="about" element={<About/>} />
          <Route path="projects" element={<Projects/>} />
          <Route path="projects/:key" element={<ProjectDetails/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="apps" element={<Apps/>} />
          <Route path='testingoverlay' element={<Test/>}/>

          {/* app links */}

          <Route path="apps/bracket-buddy" element={<BracketBuddy/>} />

          <Route index element={<Home/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
