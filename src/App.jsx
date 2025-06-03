import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import ScrollToTop from './components/ScrollToTop';
import Man from './pages/Man';
import Woman from './pages/Woman';
import Delivery from './pages/Delivery';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/man" element={<Man/>} />
        <Route path="/woman" element={<Woman/>} />
        <Route path='/delivery' element={<Delivery/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
