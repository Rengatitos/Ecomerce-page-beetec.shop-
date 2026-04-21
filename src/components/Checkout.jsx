import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityType, setCityType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre_completo: '',
    dni: '',
    metodo_pago: '',
    codigo_fin: '',
    lugar_envio: '',
    red_social: 'web',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('beetecCart') || '[]');
    setCartItems(cart);
    const sum = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(sum);
  };

  const handleSelectCity = (city, type) => {
    setSelectedCity(city);
    setCityType(type);
    setFormData(prev => ({ ...prev, lugar_envio: city }));
    setStep(2);
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

    localStorage.removeItem('beetecCart');

    const url = `https://wa.me/51903232658?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: #fffbea;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        h1 {
          color: #111;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }

        input, select {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250,204,21,0.3);
        }

        button {
          padding: 14px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-main {
          background: linear-gradient(135deg, #facc15, #eab308);
        }

        .btn-main:hover {
          transform: translateY(-2px);
        }

        .summary {
          background: #111;
          color: white;
          padding: 20px;
          border-radius: 15px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .city-btn {
          width: 100%;
          margin-bottom: 10px;
          background: white;
          border: 2px solid #facc15;
        }

        .city-btn:hover {
          background: #fef08a;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        {step === 1 && (
          <div className="card">
            <h1>¿Dónde te encuentras?</h1>

            <button className="city-btn" onClick={() => handleSelectCity('Lima', 'lima_callao')}>
              Lima y Callao
            </button>

            <button className="city-btn" onClick={() => handleSelectCity('Provincia', 'provincias_principales')}>
              Provincias
            </button>

            <button className="city-btn" onClick={() => handleSelectCity('Resto', 'resto_peru')}>
              Resto del Perú
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="grid">
            <div className="card">
              <h1>Datos</h1>

              <form onSubmit={handleSubmit}>
                <input name="nombre_completo" placeholder="Nombre" onChange={handleFormChange} required />
                <input name="dni" placeholder="DNI" onChange={handleFormChange} required />
                <input name="telefono" placeholder="Teléfono" onChange={handleFormChange} required />
                <input name="lugar_envio" placeholder="Dirección" onChange={handleFormChange} required />

                <select name="metodo_pago" onChange={handleFormChange} required>
                  <option value="">Pago</option>
                  <option value="Yape">Yape</option>
                  <option value="Plin">Plin</option>
                  <option value="Efectivo">Efectivo</option>
                </select>

                <button className="btn-main" disabled={loading}>
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </button>
              </form>
            </div>

            <div className="summary">
              <h3>Resumen</h3>

              {cartItems.map(item => (
                <div className="item" key={item.id}>
                  <span>{item.nombre}</span>
                  <span>S/{(item.precio * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr />

              <div className="item">
                <strong>Total</strong>
                <strong>S/{total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}