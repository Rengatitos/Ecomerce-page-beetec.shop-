import { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaTimes, FaCheck } from 'react-icons/fa';
import { products } from '../data/products';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    numero: '',
    mensaje: '',
    productos: []
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const autocompleteRef = useRef(null);

  // Generar HTML del email estético mejorado
  const generateEmailHTML = () => {
    const selectedProducts = products.filter(p => formData.productos.includes(p.id));
    const totalPrice = selectedProducts.reduce((sum, p) => sum + p.precio, 0);

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                
                <!-- HEADER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 50px 30px; text-align: center;">
                    <h1 style="font-size: 36px; font-weight: bold; margin: 0; color: #FFD700; letter-spacing: 2px;">
                      <span style="color: #FFD700;">BEE</span><span style="color: #ffffff;">TEC</span>
                    </h1>
                    <p style="margin: 15px 0 0 0; color: #FFD700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">✓ Solicitud de Información Recibida</p>
                  </td>
                </tr>

                <!-- INTRO -->
                <tr>
                  <td style="padding: 40px 30px; border-bottom: 2px solid #f0f0f0;">
                    <p style="margin: 0; color: #666; font-size: 15px; line-height: 1.8;">
                      ¡Hola!<br>
                      <strong>Hemos recibido tu solicitud de información</strong> y nos pondremos en contacto contigo lo antes posible. Aquí está un resumen de tu solicitud:
                    </p>
                  </td>
                </tr>

                <!-- INFORMACIÓN DE CONTACTO -->
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #FFD700; display: inline-block;">
                      👤 Información de Contacto
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8e8e8;">
                          <span style="color: #666; font-weight: 600; display: inline-block; width: 100px;">Nombre:</span>
                          <span style="color: #1a1a1a; font-weight: 500;">${formData.nombre}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8e8e8;">
                          <span style="color: #666; font-weight: 600; display: inline-block; width: 100px;">Correo:</span>
                          <span style="color: #1a1a1a; font-weight: 500;">${formData.correo}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #666; font-weight: 600; display: inline-block; width: 100px;">Teléfono:</span>
                          <span style="color: #1a1a1a; font-weight: 500;">${formData.numero}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- PRODUCTOS -->
                <tr>
                  <td style="padding: 30px; background: #fafafa;">
                    <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #FFD700; display: inline-block;">
                      📦 Productos de Interés
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                      <thead>
                        <tr style="background: #FFD700;">
                          <th style="padding: 12px; text-align: left; color: #1a1a1a; font-weight: 600; border-radius: 6px 0 0 0;">Producto</th>
                          <th style="padding: 12px; text-align: right; color: #1a1a1a; font-weight: 600; border-radius: 0 6px 0 0;">Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${selectedProducts.length > 0 
                          ? selectedProducts.map((p, idx) => `
                            <tr style="border-bottom: 1px solid #e8e8e8;">
                              <td style="padding: 12px; color: #333;">${p.nombre}</td>
                              <td style="padding: 12px; text-align: right; color: #FFD700; font-weight: 600;">S/ ${p.precio}</td>
                            </tr>
                          `).join('')
                          : '<tr><td colspan="2" style="padding: 20px; text-align: center; color: #999;">No especificados</td></tr>'
                        }
                      </tbody>
                    </table>
                    ${selectedProducts.length > 0 ? `
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                        <tr>
                          <td style="text-align: right; padding-top: 15px; border-top: 2px solid #FFD700;">
                            <span style="color: #666; font-weight: 600; font-size: 14px;">Total Inversión: </span>
                            <span style="color: #FFD700; font-weight: bold; font-size: 20px;">S/ ${totalPrice}</span>
                          </td>
                        </tr>
                      </table>
                    ` : ''}
                  </td>
                </tr>

                <!-- MENSAJE ADICIONAL -->
                ${formData.mensaje ? `
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #FFD700; display: inline-block;">
                      💬 Mensaje Adicional
                    </h3>
                    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FFD700; border-radius: 4px; margin-top: 15px; color: #333; line-height: 1.6;">
                      ${formData.mensaje}
                    </div>
                  </td>
                </tr>
                ` : ''}

                <!-- FOOTER -->
                <tr>
                  <td style="background: #1a1a1a; padding: 30px; text-align: center; border-top: 3px solid #FFD700;">
                    <p style="margin: 0 0 15px 0; color: #FFD700; font-weight: 600; font-size: 14px;">PRÓXIMOS PASOS</p>
                    <p style="margin: 0 0 20px 0; color: #ccc; font-size: 13px; line-height: 1.8;">
                      Hemos recibido tu solicitud. <strong style="color: #FFD700;">Nos contactaremos en máximo 48 horas</strong> para coordinar y brindarte más información sobre los productos de tu interés.
                    </p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                      <tr>
                        <td align="center" style="padding: 10px;">
                          <span style="color: #FFD700; font-size: 24px;">📞</span>
                          <br>
                          <span style="color: #ccc; font-size: 12px;">+51 903 232 658</span>
                        </td>
                        <td align="center" style="padding: 10px;">
                          <span style="color: #FFD700; font-size: 24px;">📧</span>
                          <br>
                          <span style="color: #ccc; font-size: 12px;">murdaneguigago@gmail.com</span>
                        </td>
                        <td align="center" style="padding: 10px;">
                          <span style="color: #FFD700; font-size: 24px;">🕐</span>
                          <br>
                          <span style="color: #ccc; font-size: 12px;">Lun-Dom 9am-6pm</span>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 25px 0 0 0; color: #999; font-size: 11px; border-top: 1px solid #333; padding-top: 15px;">
                      Este es un correo automático. Por favor no responda a este mensaje. <br>
                      Para consultas, contáctanos directamente a través de nuestros canales de comunicación.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    // Mostrar dropdown siempre que haya texto
    if (value.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleProductAdd = (productId) => {
    if (!formData.productos.includes(productId)) {
      setFormData(prev => ({
        ...prev,
        productos: [...prev.productos, productId]
      }));
    }
    setSearchInput('');
    setShowSuggestions(false);
    setIsMouseOverSuggestions(false);
  };

  const handleProductRemove = (productId) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.filter(id => id !== productId)
    }));
  };

  const normalizeText = (text) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const getFilteredProducts = () => {
    // Si la búsqueda está vacía, mostrar todos los productos no seleccionados
    if (searchInput.trim() === '') {
      return products.filter(p => !formData.productos.includes(p.id));
    }
    
    // Si hay búsqueda, filtrar por nombre normalizando y retornar máximo 4
    const normalizedSearch = normalizeText(searchInput);
    return products.filter(p => 
      !formData.productos.includes(p.id) &&
      normalizeText(p.nombre).includes(normalizedSearch)
    ).slice(0, 4); // Retorna hasta 4 resultados
  };

  const getSelectedProducts = () => {
    return products.filter(p => formData.productos.includes(p.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.correo || !formData.numero) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      // Obtener productos seleccionados
      const selectedProducts = products.filter(p => formData.productos.includes(p.id));
      const productsText = selectedProducts.length > 0 
        ? selectedProducts.map(p => `${p.nombre} (S/ ${p.precio})`).join(' | ')
        : 'No especificado';
      
      const totalPrice = selectedProducts.reduce((sum, p) => sum + p.precio, 0);

      // Crear un FormData para enviar
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('correo', formData.correo);
      formDataToSend.append('numero', formData.numero);
      formDataToSend.append('productos', productsText);
      formDataToSend.append('total', `S/ ${totalPrice}`);
      formDataToSend.append('mensaje', formData.mensaje || 'Sin mensaje adicional');
      formDataToSend.append('_captcha', 'false'); // Desactivar captcha
      formDataToSend.append('_next', window.location.href); // URL de redirección

      // Enviar a FormSubmit.co
      const response = await fetch('https://formsubmit.co/ajax/murdaneguigago@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok || data.success) {
        setSuccess(true);
        setFormData({
          nombre: '',
          correo: '',
          numero: '',
          mensaje: '',
          productos: []
        });
        setSearchInput('');
        setFocusedField(null);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        console.error('Error al enviar:', data);
        alert('Hubo un error al enviar. Revisa los datos e intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>¿Estás Interesado?</h2>
          <p>Cuéntanos qué productos te gustaría y nos pondremos en contacto pronto</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-content">
            {/* Left Column: Contact Info */}
            <div className="contact-info-section">
              <div className="info-card">
                <div className="info-card-icon">
                  <FaPhone />
                </div>
                <div className="info-card-content">
                  <h4>Teléfono</h4>
                  <p>+51 903 232 658</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <FaEnvelope />
                </div>
                <div className="info-card-content">
                  <h4>Correo</h4>
                  <p>murdaneguigago@gmail.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <FaClock />
                </div>
                <div className="info-card-content">
                  <h4>Disponibilidad</h4>
                  <p>Lun - Dom 9am - 6pm</p>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              {success && (
                <div className="success-alert">
                  <div className="success-icon">
                    <FaCheck />
                  </div>
                  <div>
                    <strong>¡Mensaje enviado!</strong>
                    <p>Nos contactaremos pronto para coordinar.</p>
                  </div>
                </div>
              )}

              {/* Nombre */}
              <div className="form-group">
                <div className={`floating-label-wrapper ${formData.nombre || focusedField === 'nombre' ? 'filled' : ''}`}>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-input"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('nombre')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="nombre">Nombre completo</label>
                  <div className="input-underline"></div>
                </div>
              </div>

              {/* Correo */}
              <div className="form-group">
                <div className={`floating-label-wrapper ${formData.correo || focusedField === 'correo' ? 'filled' : ''}`}>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="form-input"
                    value={formData.correo}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('correo')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="correo">Correo electrónico</label>
                  <div className="input-underline"></div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <div className={`floating-label-wrapper ${formData.numero || focusedField === 'numero' ? 'filled' : ''}`}>
                  <input
                    type="tel"
                    id="numero"
                    name="numero"
                    className="form-input"
                    value={formData.numero}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('numero')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="numero">Número de teléfono</label>
                  <div className="input-underline"></div>
                </div>
              </div>

              {/* Productos */}
              <div className="form-group products-group">
                <label className="group-label">Productos de Interés</label>
                <div className="autocomplete-container">
                  <div className={`autocomplete-wrapper ${showSuggestions ? 'open' : ''}`}>
                    <input
                      ref={autocompleteRef}
                      type="text"
                      id="productos"
                      className="autocomplete-input"
                      placeholder="Busca por nombre..."
                      value={searchInput}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        setShowSuggestions(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          if (!isMouseOverSuggestions) {
                            setShowSuggestions(false);
                          }
                        }, 100);
                      }}
                    />
                    
                    {/* Dropdown renderizado directamente (sin Portal) */}
                    {showSuggestions && (
                      <div 
                        className="autocomplete-suggestions"
                        onMouseEnter={() => setIsMouseOverSuggestions(true)}
                        onMouseLeave={() => {
                          setIsMouseOverSuggestions(false);
                        }}
                      >
                        {getFilteredProducts().length > 0 ? (
                          getFilteredProducts().map(product => (
                            <div
                              key={product.id}
                              className="autocomplete-suggestion"
                              onMouseDown={() => handleProductAdd(product.id)}
                            >
                              <div className="suggestion-content">
                                <span className="suggestion-name">{product.nombre}</span>
                                <span className="suggestion-price">S/ {product.precio}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-results">
                            <p>No se encontraron productos</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {getSelectedProducts().length > 0 && (
                  <div className="selected-products">
                    {getSelectedProducts().map(product => (
                      <div key={product.id} className="product-tag">
                        <span>{product.nombre}</span>
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => handleProductRemove(product.id)}
                          aria-label={`Remover ${product.nombre}`}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mensaje */}
              <div className="form-group">
                <label htmlFor="mensaje" className="textarea-label">Mensaje (Opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-textarea"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('mensaje')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Cuéntanos más sobre tus necesidades..."
                  rows="4"
                ></textarea>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Solicitar información ahora</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>

              <p className="form-disclaimer">
                *Nos comprometeremos a responder en máximo 48 horas
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
