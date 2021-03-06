import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Definition from './pages/Definition';

export const savedFavourites = () => {
  const savedItem = localStorage.getItem("favorites");
 const parsedItem = JSON.parse(savedItem);
 return parsedItem || "";
 }

function App() {
  const [favorites, setFavorites] = useState(savedFavourites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites/" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/definition/:word" element={<Definition setFavorites={setFavorites} favorites={favorites} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
