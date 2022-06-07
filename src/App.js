import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Definition from './pages/Definition';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites/" element={<Favorites />} />
          <Route path="/definition/:word" element={<Definition />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
