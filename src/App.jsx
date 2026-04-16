import { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <>
      <AnnouncementBar />
      <Navigation />
      <main>
        <Hero />
        <Catalog onViewDetails={handleViewDetails} />
      </main>
      <Reviews />
      <Contact />
      <Footer />
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
