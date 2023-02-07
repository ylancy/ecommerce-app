import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './scenes/globals/navbar';
import CartMenu from './scenes/globals/cartMenu';
import Footer from './scenes/globals/footer';
import Home from './scenes/home/index';
import ItemDetails from './scenes/itemDetails/index';
import Checkout from './scenes/checkout/index';
import Confirmation from './scenes/checkout/confirmation';

const ScrollToTop = () => {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathName])
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='items/:itemId' element={<ItemDetails />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/success' element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
