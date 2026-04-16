import { useState, useEffect } from 'react';
import SocialLinks from './SocialLinks';

export default function Hero() {
  const features = [
    { icon: '🚀', text: '100% Seguridad en tus compras' },
    { icon: '⚡', text: 'Entrega rápida en 24-48 horas' },
    { icon: '💳', text: 'Múltiples métodos de pago' },
    { icon: '🔄', text: 'Garantía en todos nuestros productos' },
    { icon: '📞', text: 'Soporte al cliente 24/7' },
    { icon: '🎁', text: 'Descuentos especiales para clientes frecuentes' },
    { icon: '✅', text: 'Más de 1.250 pedidos satisfechos' },
    { icon: '🌟', text: 'Productos de las mejores marcas' }
  ];

  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [features.length]);

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="feature-carousel" key={currentFeature}>
            <span className="feature-icon">{features[currentFeature].icon}</span>
            <span className="feature-text">{features[currentFeature].text}</span>
          </div>
          
          <div className="hero-title-wrapper">
            <h1 className="hero-title">
              BeeTec<br />
              <span className="highlight-gradient">Tienda en Línea</span>
            </h1>
            <img src="logo.png" alt="BeeTec Logo" className="floating-img mobile-logo" />
          </div>

          <SocialLinks />

          <p className="hero-description">
            Descubre la tecnología más innovadora para mejorar tu hogar. En BeeTec encontrarás productos de las mejores marcas, con garantía, envíos rápidos y soporte 24/7.
          </p>

          <div className="hero-cta-group">
            <button className="cta-primary" onClick={scrollToCatalog}>
              <span>Explorar Productos</span>
              <svg className="cta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="carousel-dots">
            {features.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentFeature ? 'active' : ''}`}
                onClick={() => setCurrentFeature(idx)}
                aria-label={`Feature ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <div className="image-orb"></div>
          <img src="logo.png" alt="BeeTec Logo" className="floating-img desktop-logo" />
        </div>
      </div>
    </section>
  );
}
