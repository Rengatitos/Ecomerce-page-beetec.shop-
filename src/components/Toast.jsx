import { useState, useEffect } from 'react';
import '../styles/Toast.css';

export default function Toast({ message, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!isVisible) return null;

  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
}
