import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import {
  BookingTickets,
  Home,
  MoviesDetails,
  SignIn,
  SignUp,
  News,
  Events,
  Profile,
  BookingHistory,
} from './pages';
import SharedLayout from './sharedLayout/HomeLayout';
import NoUserProtected from './protectedRoutes/NoUserProtected';
import UserProtected from './protectedRoutes/UserProtected';

function App() {
  const { isLoading } = useSelector((state) => state.ui);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/movies/:id' element={<MoviesDetails />} />
          <Route path='/news' element={<News />} />
          <Route path='/events' element={<Events />} />
          <Route element={<UserProtected />}>
            <Route path='/showTime/:id' element={<BookingTickets />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/booking-history' element={<BookingHistory />} />
          </Route>
        </Route>
        <Route element={<NoUserProtected />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
