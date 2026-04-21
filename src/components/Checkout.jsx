import { useState, useEffect } from 'react';

const PROVINCIAS_PRINCIPALES = ['Arequipa', 'Cusco', 'Trujillo', 'Chiclayo', 'Piura'];
const LABEL_PROVINCIAS = PROVINCIAS_PRINCIPALES.join(', ');

export default function Checkout() {

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityType, setCityType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre_completo: '',
    dni: '',
    metodo_pago: '',
    lugar_envio: '',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  // Controlar overflow del body cuando modal es visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('beetecCart') || '[]');
    setCartItems(cart);
    const sum = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(sum);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calcularAnticipo = () => {
    if (cityType === 'lima_callao') return { anticipo: false, monto: 0 };
    if (cityType === 'provincias_principales') return { anticipo: true, monto: 'S/20' };
    return { anticipo: true, monto: 'S/60' };
  };

  const crearMensajeWhatsapp = (data) => {
    const productos = data.productos
      .map(p => `• ${p.nombre} x${p.quantity} = S/${(p.precio * p.quantity).toFixed(2)}`)
      .join('\n');

    return `🟡 *NUEVO PEDIDO BEETEC*

👤 ${data.nombre_completo}
DNI: ${data.dni}
📞 ${data.telefono}
Email: ${data.email}

📍 ${data.lugar_envio}

📦 PRODUCTOS:
${productos}

💰 Total: S/${data.total.toFixed(2)}
💳 ${data.metodo_pago}

${data.anticipo.anticipo ? `Adelanto: ${data.anticipo.monto}` : 'Pago contraentrega'}

¡Confirmar pedido por favor! 🚀`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Carrito vacío');
      return;
    }

    setLoading(true);

    const anticipo = calcularAnticipo();

    const mensaje = crearMensajeWhatsapp({
      ...formData,
      productos: cartItems,
      total,
      anticipo
    });

    // Enviar correo
    try {
      await fetch('https://formsubmit.co/ajax/murdaneguigago@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre_completo,
          dni: formData.dni,
          telefono: formData.telefono,
          email: formData.email,
          direccion: formData.lugar_envio,
          metodo_pago: formData.metodo_pago,
          productos: cartItems.map(p => `${p.nombre} x${p.quantity} = S/${(p.precio * p.quantity).toFixed(2)}`).join(', '),
          total: `S/${total.toFixed(2)}`,
          anticipo: anticipo.anticipo ? anticipo.monto : 'Pago contraentrega',
        })
      });
    } catch (err) {
      // Silenciar error
    }

    localStorage.removeItem('beetecCart');

    // WhatsApp
    const url = `https://wa.me/51903232658?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    setTimeout(() => setVisible(false), 1000);
  };

  return (
    <>
      <style>{`
        body.checkout-open {
          overflow: hidden !important;
        }

        .checkout-modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 9999 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
        }

        .checkout-modal {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          max-width: 900px;
          width: 100%;
          padding: 0;
          position: relative;
          margin: 20px auto;
          overflow: hidden;
          max-height: 85vh;
          overflow-y: auto;
        }

        .checkout-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #facc15;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 24px;
          font-weight: bold;
          color: #111;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .checkout-close:hover {
          background: #eab308;
          transform: rotate(90deg);
        }

        .checkout-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          min-height: 500px;
        }

        .checkout-form {
          padding: 40px 36px;
          background: #fafafa;
        }

        .checkout-form h2 {
          margin: 0 0 24px 0;
          color: #111;
          font-size: 1.6rem;
        }

        .checkout-summary {
          background: #111;
          color: white;
          padding: 40px 28px;
          display: flex;
          flex-direction: column;
        }

        .checkout-summary h3 {
          margin: 0 0 20px 0;
          font-size: 1.3rem;
          color: #facc15;
        }

        .checkout-items-list {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .checkout-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.95rem;
        }

        .checkout-item span:first-child {
          flex: 1;
        }

        .checkout-item span:last-child {
          color: #facc15;
          font-weight: 600;
        }

        .checkout-divider {
          border: none;
          border-top: 1px solid #facc15;
          margin: 16px 0;
        }

        .checkout-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: bold;
          padding: 12px 0;
        }

        .checkout-total span:last-child {
          color: #facc15;
        }

        .checkout-input,
        .checkout-select {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 14px;
          border: 1.5px solid #e5e5e5;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          background: white;
          transition: all 0.2s;
        }

        .checkout-input:focus,
        .checkout-select:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.15);
          background: white;
        }

        .checkout-btn-main {
          background: linear-gradient(135deg, #facc15, #eab308);
          color: #111;
          width: 100%;
          padding: 14px;
          margin-top: 16px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkout-btn-main:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
        }

        .checkout-btn-main:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .checkout-btn-secondary {
          background: white;
          color: #111;
          border: 2px solid #facc15;
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkout-btn-secondary:hover:not(:disabled) {
          background: #fef08a;
        }

        .checkout-btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkout-step {
          width: 100%;
        }



        .checkout-empty {
          color: #facc15;
          text-align: center;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .checkout-content {
            grid-template-columns: 1fr;
          }

          .checkout-modal {
            margin: 20px auto;
            border-radius: 16px;
          }

          .checkout-form {
            padding: 28px 20px;
          }

          .checkout-summary {
            padding: 28px 20px;
          }
        }
      `}</style>

      {/* Modal */}
      {visible && (
        <div className="checkout-modal-bg" onClick={() => setVisible(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <button
              className="checkout-close"
              onClick={() => setVisible(false)}
              aria-label="Cerrar carrito"
            >
              ×
            </button>

            <div className="checkout-content">
              <div className="checkout-form">
                {step === 1 && (
                  <div className="checkout-step">
                    <h2>¿Dónde te encuentras?</h2>
                    <select
                      className="checkout-select"
                      value={selectedCity || ''}
                      onChange={e => {
                        const val = e.target.value;
                        let type = 'resto_peru';
                        if (val === 'Lima') type = 'lima_callao';
                        else if (PROVINCIAS_PRINCIPALES.includes(val)) type = 'provincias_principales';
                        setSelectedCity(val);
                        setCityType(type);
                        setFormData(prev => ({ ...prev, lugar_envio: val }));
                      }}
                      required
                    >
                      <option value="">Selecciona tu provincia</option>
                      <option value="Lima">Lima y Callao</option>
                      <option value="Arequipa">Arequipa, Cusco, Trujillo, Chiclayo, Piura</option>
                      <option value="Resto">Resto del Perú</option>
                    </select>
                    <button
                      className="checkout-btn-main"
                      onClick={() => selectedCity && setStep(2)}
                      disabled={!selectedCity}
                    >
                      Siguiente
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <h2>Completa tu información</h2>
                    <input
                      className="checkout-input"
                      name="nombre_completo"
                      placeholder="Nombre completo"
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      className="checkout-input"
                      name="dni"
                      placeholder="DNI"
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      className="checkout-input"
                      name="email"
                      placeholder="Correo electrónico"
                      type="email"
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      className="checkout-input"
                      name="telefono"
                      placeholder="Teléfono"
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      className="checkout-input"
                      name="lugar_envio"
                      placeholder="Dirección de envío"
                      onChange={handleFormChange}
                      required
                      value={formData.lugar_envio}
                    />
                    <select
                      className="checkout-select"
                      name="metodo_pago"
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Método de pago</option>
                      <option value="Yape">Yape</option>
                      <option value="Plin">Plin</option>
                      <option value="Efectivo">Efectivo</option>
                    </select>
                    <button
                      className="checkout-btn-secondary"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      ← Atrás
                    </button>
                    <button
                      className="checkout-btn-main"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Procesando...' : 'Confirmar Pedido'}
                    </button>
                  </form>
                )}
              </div>

              <div className="checkout-summary">
                <h3>Resumen del Pedido</h3>
                <div className="checkout-items-list">
                  {cartItems.length === 0 ? (
                    <div className="checkout-empty">Carrito vacío</div>
                  ) : (
                    cartItems.map(item => (
                      <div className="checkout-item" key={item.id}>
                        <span>{item.nombre} x{item.quantity}</span>
                        <span>S/{(item.precio * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                <hr className="checkout-divider" />

                <div className="checkout-total">
                  <span>Total:</span>
                  <span>S/{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}