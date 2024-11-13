// src/App.js
import './App.css';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import FAQ from './pages/FAQ';
import ContactPage from './pages/ContactPage';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/faq" element={<FAQ />} /> 
        <Route path="/contactos" element={<ContactPage/>} />
      </Routes>
    </Router>
  );
}


export default App;
