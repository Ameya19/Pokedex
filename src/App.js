import './App.css';
import Home from './components/home';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/pokemonDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
