import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Header from './components/Header';
import HeroSide from './components/HeroSide';
import { OutlineButton } from './components/Button';
import MovieList from './components/MovieList';

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
              <div className='container'>
                <div className='section mb-3'>
                  <div className='section__header mb-2'>
                    <h2>Trending Movies</h2>
                    <Link to='/movie'>
                      <OutlineButton className='small'>View more</OutlineButton>
                    </Link>
                  </div>
                  <MovieList />
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
