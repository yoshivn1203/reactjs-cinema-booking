import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import BookingTickets from './pages/BookingTickets';
import MoviesDetails from './pages/MoviesDetails';
import SignUp from './pages/SignUp';
import SharedLayout from './pages/SharedLayout';

function App() {
  const { isLoading } = useSelector((state) => state.ui);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/movies/:id' element={<MoviesDetails />} />
          <Route path='/showTime/:id' element={<BookingTickets />} />
        </Route>
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
