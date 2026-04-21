import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductImage } from '../data/products';
import '../styles/Cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCart();
    
    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    let cart = JSON.parse(localStorage.getItem('beetecCart') || '[]');
    
    // Corregir y normalizar imágenes usando la función helper
    cart = cart.map(item => ({
      ...item,
      imagen: getProductImage(item.id)
    }));
    
    // Guardar cart corregido
    localStorage.setItem('beetecCart', JSON.stringify(cart));
    
    setCartItems(cart);
    calculateTotal(cart);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem('beetecCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    loadCart();
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('beetecCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    loadCart();
  };

  const clearCart = () => {
    localStorage.removeItem('beetecCart');
    setCartItems([]);
    setTotal(0);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h1>Tu Carrito</h1>
          <p>Tu carrito está vacío</p>
          <button 
            className="btn-continue-shopping"
            onClick={() => navigate('/')}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1>Tu Carrito</h1>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imagen} alt={item.nombre} className="item-image" />
              
              <div className="item-details">
                <h3>{item.nombre}</h3>
                <p className="item-price">${item.precio.toFixed(2)}</p>
              </div>

              <div className="item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="qty-btn"
                >
                  −
                </button>
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (val > 0) updateQuantity(item.id, val);
                  }}
                  className="qty-input"
                />
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="item-subtotal">
                <p>${(item.precio * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className="btn-remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            className="btn-checkout"
            onClick={() => navigate('/checkout')}
          >
            Proceder al Pago
          </button>

          <button 
            className="btn-continue-shopping"
            onClick={() => navigate('/')}
          >
            Continuar Comprando
          </button>

          <button 
            className="btn-clear-cart"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
