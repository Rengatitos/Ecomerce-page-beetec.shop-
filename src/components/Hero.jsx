export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge">Más de 1.250 Pedidos Entregados</span>
          <div className="hero-title-wrapper">
            <h1>BeeTec<br /><span className="highlight">Tienda en Línea</span></h1>
            <img src="logo.png" alt="BeeTec Logo" className="floating-img mobile-logo" />
          </div>
          <p>Ofrecemos los productos de tecnología más innovadores para tu hogar, diseñados para mejorar tu calidad de vida.</p>
        </div>
        <div className="hero-image">
          <div className="image-orb"></div>
          <img src="logo.png" alt="BeeTec Logo" className="floating-img desktop-logo" />
        </div>
      </div>
    </section>
  );
}
