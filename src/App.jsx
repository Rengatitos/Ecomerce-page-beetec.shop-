import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function HomePage({ onViewDetails }) {
  return (
    <>
      <Hero />
      <Catalog onViewDetails={onViewDetails} />
      <Reviews />
      <Contact />
    </>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <BrowserRouter>
      <AnnouncementBar />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onViewDetails={handleViewDetails} />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
