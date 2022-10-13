import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookingTickets from './pages/BookingTickets';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<BookingTickets />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
