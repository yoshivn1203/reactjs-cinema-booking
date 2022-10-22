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
  MoviesManagement,
  UserManagement,
  UnderMaintenance,
  AddAndEditUsers,
} from './pages';
import HomeLayout from './sharedLayout/HomeLayout';
import AdminLayout from './sharedLayout/AdminLayout';
import NoUserProtected from './protectedRoutes/NoUserProtected';
import UserProtected from './protectedRoutes/UserProtected';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const { isLoading } = useSelector((state) => state.ui);
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      {isLoading && <LoadingSpinner />}
      <ScrollToTop />
      <ToastContainer theme='dark' autoClose={3000} />
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path='movies/:id' element={<MoviesDetails />} />
          <Route path='news' element={<News />} />
          <Route path='events' element={<Events />} />
          <Route element={<UserProtected />}>
            <Route path='showTime/:id' element={<BookingTickets />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route element={<NoUserProtected />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<UserManagement />} />
          <Route path='movies-management' element={<MoviesManagement />} />
          <Route path='add-edit-user' element={<AddAndEditUsers />} />
          <Route path='support' element={<UnderMaintenance />} />
          <Route path='report-bug' element={<UnderMaintenance />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
