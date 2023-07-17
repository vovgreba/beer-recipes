import React from 'react';

import BeerRecipes from "./Components/Pages/BeerRecipes/BeerRecipes";
import BeerRecipe from "./Components/Pages/BeerRecipe/BeerRecipe";

import './App.scss';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element= {<BeerRecipes/>}/>
      <Route path='/recipe/:name/:id' element= {<BeerRecipe/>}/>
    </Routes>
  </>

  );
}

export default App;
