import { FaFacebook, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61576777971795',
      icon: FaFacebook,
      label: 'fb'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/51903232658?text=%C2%A1Hola%2C%20estoy%20interesad%40%20en%20uno%20de%20sus%20productos%21',
      icon: FaWhatsapp,
      label: 'wa'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@beetec5',
      icon: FaTiktok,
      label: 'tk'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/beetechome/',
      icon: FaInstagram,
      label: 'ig'
    }
  ];

  return (
    <div className="social-links-container">
      <div className="social-links">
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={social.name}
              aria-label={social.name}
            >
              <IconComponent className="social-icon" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
