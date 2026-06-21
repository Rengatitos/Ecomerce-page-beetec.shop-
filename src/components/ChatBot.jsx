import { useState } from 'react';
import '../styles/ChatBot.css';

const WHATSAPP_NUMBER = "51919477248";

const PRODUCTOS = {
  cafetera: {
    id: 'cafetera',
    nombre: 'Máquina de Café Portátil 3 en 1',
    precio: 199,
    stock: false
  },
  alfombra: {
    id: 'alfombra',
    nombre: 'Earthing Mat - Alfombrilla de Conexión a Tierra',
    precio: 149,
    stock: true
  },
  // nuevos productos
  grifocalentador: {
    id: 'grifocalentador',
    nombre: 'Grifo Calentador Instantáneo de Agua 3000W',
    precio: 89,
    stock: true
  },
  
  masajeador: {
    id: 'masajeador',
    nombre: 'Masajeador Eléctrico de Percusión Portátil', 
    precio: 119,
    stock: true
  },

  extractorMama: {
    id: 'extractorMama',
    nombre: 'Extractor de Leche Eléctrico Portátil',
    precio: 119,
    stock: true
  },


  leche: {
    id: 'leche',
    nombre: 'Máquina Multifunción de Leche Vegetal',
    precio: 199,
    stock: false
  },
  secadora: {
    id: 'secadora',
    nombre: 'Secadora de Ropa Portátil Inteligente',
    precio: 189,
    stock: false
  },
  refri: {
    id: 'refri',
    nombre: 'Mini Beauty Fridge - Refrigeradora Skin Care',
    precio: 209,
    stock: false
  },
  cepillo: {
    id: 'cepillo',
    nombre: 'Combo Sonrisa Smart - Cepillo Eléctrico + Esterilizador UV',
    precio: 99,
    stock: false
  },
  camara: {
    id: 'camara',
    nombre: 'Cámara Digital Infantil con Impresión Instantánea',
    precio: 169,
    stock: false
  },
  calentador: {
    id: 'calentador',
    nombre: 'Calefactor Cerámico Portátil 500W',
    precio: 109,
    stock: false
  }
};

const provinciasPrincipales = [
  "arequipa", "trujillo", "chiclayo", "piura", "ica",
  "ayacucho", "puno", "juliaca", "tacna", "moquegua"
];

const normalizar = (txt = "") =>
  txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const obtenerEnvio = (ciudad) => {
  const c = normalizar(ciudad);

  if (c.includes("lima") || c.includes("callao")) {
    return {
      zona: "Lima / Callao",
      adelanto: 0,
      envio: "Contraentrega",
      proveedor: "Envío directo",
      tiempo: "24h",
      requiereDni: false
    };
  }

  if (provinciasPrincipales.includes(c)) {
    return {
      zona: "Provincia Principal",
      adelanto: 20,
      envio: "Saldo contraentrega",
      proveedor: "Envío directo",
      tiempo: "2-3 días",
      requiereDni: true
    };
  }

  return {
    zona: "Otra ciudad",
    adelanto: 60,
    envio: "Pago en agencia",
    proveedor: "Shalom",
    tiempo: "3-5 días",
    requiereDni: true
  };
};

export default function ChatBot({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hola! 👋 Bienvenido a nuestro catálogo. ¿Cuál producto te interesa?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [currentStep, setCurrentStep] = useState('seleccionar_producto');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [envioInfo, setEnvioInfo] = useState(null);
  const [isReservation, setIsReservation] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    dni: '',
    correo: '',
    telefono: '',
    ciudad: '',
    metodoPago: '',
    ubicacionMaps: ''
  });

  const metodosPayment = [
    { label: 'Yape / Plin', value: 'Yape / Plin' },
    { label: 'Transferencia BCP', value: 'Transferencia BCP' },
    { label: 'Tarjeta', value: 'Tarjeta' },
    { label: 'Efectivo', value: 'Efectivo' }
  ];

  const addMessage = (text, sender = 'user') => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectProduct = (productKey) => {
    const prod = PRODUCTOS[productKey];
    setSelectedProduct(prod);
    setIsReservation(!prod.stock);
    
    addMessage(prod.nombre, 'user');
    
    setTimeout(() => {
      if (prod.stock) {
        addMessage(`¡Excelente! 🎉 Elegiste ${prod.nombre}.\n\nAhora, ¿en qué ciudad estás?`, 'bot');
        setCurrentStep('seleccionar_ciudad');
      } else {
        addMessage(`${prod.nombre}\n\n⚠️ Actualmente sin stock.\n\n¿Te gustaría reservar este producto para cuando volvamos a tener disponibilidad? 📝`, 'bot');
        setCurrentStep('formulario_reserva');
      }
    }, 500);
  };

  const handleSelectCity = (city) => {
    const envio = obtenerEnvio(city);
    setSelectedCity(city);
    setEnvioInfo(envio);
    setFormData({ ...formData, ciudad: city });

    addMessage(`Mi ciudad es ${city}`, 'user');

    setTimeout(() => {
      if (envio.adelanto === 0) {
        addMessage(
          `✅ Perfecto! Para ${envio.zona}:\n\n🎉 Pago contraentrega\n🚚 Envío GRATIS\n⏱️ Entrega en ${envio.tiempo}\n\n¿Procedemos con tu compra?`,
          'bot'
        );
      } else {
        addMessage(
          `✅ Genial! Para ${envio.zona}:\n\n💰 Adelanto: S/${envio.adelanto}\n💵 Saldo contraentrega\n🚚 Envío GRATIS\n⏱️ Entrega en ${envio.tiempo}\n\n¿Procedemos?`,
          'bot'
        );
      }
      setCurrentStep('confirmar_compra');
    }, 500);
  };

  const handleComprar = () => {
    if (!selectedCity || !selectedProduct) {
      addMessage('Por favor completa los pasos anteriores primero 📍', 'bot');
      return;
    }

    addMessage('Quiero comprar', 'user');
    setTimeout(() => {
      addMessage('¡Excelente! Llena el formulario para completar tu compra 📝', 'bot');
      setCurrentStep('formulario');
    }, 500);
  };

  const generarLinkGoogleMaps = (direccion) => {
    if (!direccion.trim()) return null;
    const encodedAddress = encodeURIComponent(direccion);
    return `https://maps.google.com/?q=${encodedAddress}`;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const envio = obtenerEnvio(formData.ciudad);
    const total = selectedProduct.precio;
    const saldo = total - envio.adelanto;

    if (
      !formData.nombreCompleto ||
      !formData.correo ||
      !formData.telefono ||
      !formData.ciudad ||
      !formData.metodoPago ||
      !formData.ubicacionMaps
    ) {
      addMessage('Por favor completa todos los campos obligatorios.', 'bot');
      return;
    }

    if (envio.requiereDni && !formData.dni) {
      addMessage('Para envíos con adelanto necesitamos tu DNI. 📝', 'bot');
      return;
    }

    const linkMaps = generarLinkGoogleMaps(formData.ubicacionMaps);

    const mensaje = `NUEVO PEDIDO

Cliente: ${formData.nombreCompleto}
${formData.dni ? `DNI: ${formData.dni}` : ''}
Correo: ${formData.correo}
Telefono: ${formData.telefono}
Ciudad o distrito: ${formData.ciudad}
Ubicacion: ${linkMaps || formData.ubicacionMaps}

PRODUCTO
Producto: ${selectedProduct.nombre}
Precio unitario: S/${selectedProduct.precio}
Total: S/${total}

ENVIO
Zona: ${envio.zona}
Proveedor: ${envio.proveedor}
Modalidad: ${envio.envio}
Tiempo: ${envio.tiempo}

PAGO
Metodo de pago: ${formData.metodoPago}
Adelanto: S/${envio.adelanto}
Saldo: S/${saldo}

${
  envio.adelanto > 0
    ? `DATOS PARA ADELANTO
Yape/Plin: 985056984
BCP: 19400709051011
CCI: 00219410070905101190
Titular: Mayra Urdanegui

El cliente debe enviar la captura del voucher por WhatsApp.`
    : `Pago contraentrega en Lima/Callao.`
}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    addMessage('Enviando pedido...', 'user');

    setTimeout(() => {
      window.open(url, '_blank');
      addMessage(
        envio.adelanto > 0
          ? '✅ Se abrirá WhatsApp con tu pedido. Adjunta la captura del adelanto para confirmar.'
          : '✅ Se abrirá WhatsApp con tu pedido para confirmar la entrega contraentrega.',
        'bot'
      );
      setCurrentStep('exito');
    }, 500);
  };

  const handleSubmitReserva = (e) => {
    e.preventDefault();

    if (!formData.nombreCompleto || !formData.telefono) {
      addMessage('Por favor completa nombre y teléfono para la reserva. 📝', 'bot');
      return;
    }

    const mensaje = `RESERVA DE PRODUCTO

Cliente: ${formData.nombreCompleto}
Telefono: ${formData.telefono}

PRODUCTO
Producto: ${selectedProduct.nombre}
Precio: S/${selectedProduct.precio}

Quiero reservar este producto para la próxima vez que haya stock. 📦`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    addMessage('Enviando reserva...', 'user');

    setTimeout(() => {
      window.open(url, '_blank');
      addMessage(
        '✅ Se abrirá WhatsApp con tu reserva. Te contactaremos cuando el producto esté disponible.',
        'bot'
      );
      setCurrentStep('exito');
    }, 500);
  };

  const renderBotContent = () => {
    switch (currentStep) {
      case 'seleccionar_producto':
        const productosStock = Object.values(PRODUCTOS).filter(p => p.stock);
        const productosSinStock = Object.values(PRODUCTOS).filter(p => !p.stock);
        
        return (
          <div className="chat-options">
            <div style={{ marginBottom: '8px', fontSize: '11px', color: '#666', fontWeight: 'bold' }}>
              📦 CON STOCK
            </div>
            {productosStock.map((prod) => (
              <button
                key={prod.id}
                className="chat-btn-primary"
                onClick={() => handleSelectProduct(prod.id)}
                type="button"
              >
                ✅ {prod.nombre} - S/{prod.precio}
              </button>
            ))}
            
            <div style={{ marginTop: '12px', marginBottom: '8px', fontSize: '11px', color: '#999', fontWeight: 'bold' }}>
              ⏳ SIN STOCK (Reserva disponible)
            </div>
            {productosSinStock.map((prod) => (
              <button
                key={prod.id}
                className="chat-btn-secondary"
                onClick={() => handleSelectProduct(prod.id)}
                type="button"
              >
                ⏳ {prod.nombre} - S/{prod.precio}
              </button>
            ))}
          </div>
        );

      case 'seleccionar_ciudad':
        return (
          <div className="chat-options">
            <button
              className="chat-btn-city"
              onClick={() => handleSelectCity('Lima')}
              type="button"
            >
              📍 Lima / Callao
            </button>
            <button
              className="chat-btn-city"
              onClick={() => {
                addMessage('Provincias', 'user');
                setTimeout(() => {
                  addMessage(
                    '¿De cuál de estas ciudades eres?',
                    'bot'
                  );
                  setCurrentStep('seleccionar_provincia');
                }, 300);
              }}
              type="button"
            >
              📍 Provincias
            </button>
          </div>
        );

      case 'seleccionar_provincia':
        const provincias = ['Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Ica', 'Ayacucho', 'Puno', 'Juliaca', 'Tacna', 'Moquegua'];
        return (
          <div className="chat-options">
            {provincias.map((prov) => (
              <button
                key={prov}
                className="chat-btn-city"
                onClick={() => handleSelectCity(prov)}
                type="button"
              >
                {prov}
              </button>
            ))}
            <button
              className="chat-btn-city"
              onClick={() => {
                addMessage('Otra ciudad', 'user');
                setTimeout(() => {
                  addMessage(
                    '📍 Cuéntame tu ciudad (ej: Cusco, Arequipa, Huancayo, etc)',
                    'bot'
                  );
                  setCurrentStep('escribir_ciudad');
                }, 300);
              }}
              type="button"
            >
              ✏️ Otra ciudad
            </button>
          </div>
        );

      case 'escribir_ciudad':
        return (
          <div className="chat-form">
            <input
              type="text"
              placeholder="Escribe tu ciudad..."
              id="input-ciudad"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const ciudad = e.target.value.trim();
                  if (ciudad) {
                    handleSelectCity(ciudad);
                  }
                }
              }}
            />
            <button
              className="chat-btn-submit"
              onClick={() => {
                const input = document.getElementById('input-ciudad');
                const ciudad = input.value.trim();
                if (ciudad) {
                  handleSelectCity(ciudad);
                }
              }}
              type="button"
            >
              Confirmar
            </button>
          </div>
        );

      case 'confirmar_compra':
        return (
          <div className="chat-options">
            <button
              className="chat-btn-primary"
              onClick={handleComprar}
              type="button"
            >
              Proceder con compra
            </button>
            <button
              className="chat-btn-secondary"
              onClick={() => {
                addMessage('Cambiar ciudad', 'user');
                setCurrentStep('seleccionar_ciudad');
                setSelectedCity(null);
                setEnvioInfo(null);
              }}
              type="button"
            >
              Cambiar ciudad
            </button>
          </div>
        );

      case 'formulario':
        return (
          <form className="chat-form" onSubmit={handleSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre y apellido *"
                value={formData.nombreCompleto}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                required
              />
            </div>

            {envioInfo?.requiereDni && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="DNI *"
                  value={formData.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                placeholder="Correo electrónico *"
                value={formData.correo}
                onChange={(e) => handleInputChange('correo', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Teléfono *"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <select
                value={formData.metodoPago}
                onChange={(e) => handleInputChange('metodoPago', e.target.value)}
                required
              >
                <option value="">Método de pago *</option>
                {metodosPayment.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '10px', color: '#666', marginBottom: '4px', display: 'block' }}>
                Dirección (ej: Av. Siempreviva 123, Puente Piedra, Lima) *
              </label>
              <input
                type="text"
                placeholder="Tu dirección completa *"
                value={formData.ubicacionMaps}
                onChange={(e) => handleInputChange('ubicacionMaps', e.target.value)}
                required
              />
              <small style={{ fontSize: '9px', color: '#999', marginTop: '2px', display: 'block' }}>
                Se generará automáticamente el link de Google Maps
              </small>
            </div>

            <button type="submit" className="chat-btn-submit">
              Enviar pedido
            </button>
          </form>
        );

      case 'formulario_reserva':
        return (
          <form className="chat-form" onSubmit={handleSubmitReserva}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tu nombre *"
                value={formData.nombreCompleto}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Tu teléfono *"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                required
              />
            </div>

            <button type="submit" className="chat-btn-submit">
              Reservar producto
            </button>
          </form>
        );

      case 'exito':
        return (
          <div className="chat-options">
            <p className="success-message">
              ✅ ¡Listo! Nos contactaremos en breve para confirmar.
            </p>
            <button
              className="chat-btn-primary"
              onClick={() => {
                setCurrentStep('seleccionar_producto');
                setMessages([
                  {
                    id: 1,
                    text: 'Hola! 👋 Bienvenido a nuestro catálogo. ¿Cuál producto te interesa?',
                    sender: 'bot',
                    timestamp: new Date()
                  }
                ]);
                setFormData({
                  nombreCompleto: '',
                  dni: '',
                  correo: '',
                  telefono: '',
                  ciudad: '',
                  metodoPago: '',
                  ubicacionMaps: ''
                });
                setSelectedProduct(null);
                setSelectedCity(null);
                setEnvioInfo(null);
                setIsReservation(false);
              }}
              type="button"
            >
              Nuevo chat
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat de ventas"
        type="button"
      >
        <img
  src="https://img.freepik.com/vector-premium/whatsapp-logo-iconic-speech-bubble-and-phone-symbol-on-green_678821-509.jpg?semt=ais_hybrid&w=740&q=80"
  alt="WhatsApp"
  style={{
    width:"40px",
    height:"40px",
    borderRadius:"50%"
  }}
/>
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Asesor de Ventas</h3>
            <div className="chatbot-status">
            🟢 En línea
           </div>
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="chatbot-options">{renderBotContent()}</div>
        </div>
      )}
    </div>
  );
}
