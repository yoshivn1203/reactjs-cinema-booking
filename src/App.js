import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroSide from './components/HeroSide';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <HeroSide />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
