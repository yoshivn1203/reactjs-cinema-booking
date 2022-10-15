import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Home from './pages/Home';
import BookingTickets from './pages/BookingTickets';
import MoviesDetails from './pages/MoviesDetails';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { isLoading } = useSelector((state) => state.ui);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:id' element={<MoviesDetails />} />
        <Route path='/showTime/:id' element={<BookingTickets />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
