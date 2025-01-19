import './App.css';
import Home from './components/home';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pokedex" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
