import { FaFacebook, FaWhatsapp, FaTiktok, FaInstagram, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61576777971795',
      icon: FaFacebook
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/51903232658?text=%C2%A1Hola%2C%20estoy%20interesad%40%20en%20uno%20de%20sus%20productos%21',
      icon: FaWhatsapp
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@beetec5',
      icon: FaTiktok
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/beetechome/',
      icon: FaInstagram
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BeeTec</h3>
            <p>Tu tienda en línea de confianza para los mejores productos de tecnología</p>
            <div className="footer-socials">
              {socialLinks.map(social => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    title={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#catalog">Catálogo</a></li>
              <li><a href="#reviews">Comentarios</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a></li>
              <li>
                <a href="/libro-reclamaciones.html" target="_blank" rel="noopener noreferrer">
                  Libro de Reclamaciones
                </a>
              </li>
              <li><a href="/terminos-condiciones.html" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <p><FaPhone className="footer-icon" /> +51 903 232 658</p>
            <p><FaEnvelope className="footer-icon" /> murdaneguigago@gmail.com</p>
            <p><FaClock className="footer-icon" /> Lun - Dom 9am - 6pm</p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} BeeTec. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para ti</p>
        </div>
      </div>
    </footer>
  );
}
