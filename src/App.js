import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookingTickets from './pages/BookingTickets';
import MoviesDetails from './pages/MoviesDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<BookingTickets />} />
        <Route path='/movies/:id' element={<MoviesDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
