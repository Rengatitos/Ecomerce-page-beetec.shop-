// Datos de productos
const products = [
    {
        id: 1,
        nombre: "Máquina Portátil de Café Espresso 3 en 1",
        precio: 199,
        imagen: "cafeport.png",
        video: "videocafe.mp4",
        descripcion: "Máquina portátil de café espresso con 20 bares de presión, batería 7800 mAh. Ideal para viajes.",
        caracteristicas: [
            "20 bares de presión",
            "Batería recargable 7800 mAh",
            "Portátil y compacto",
            "Compatible con cápsulas y café molido"
        ],
        especificaciones: {
            "Presión": "20 bares",
            "Batería": "7800 mAh",
            "Tazas (frío)": "4-5",
            "Tazas (caliente)": "Hasta 100",
            "Tiempo de carga": "3 a 3.5 horas",
            "Tanque de agua": "80 ml"
        },
        beneficios: [
            "Espresso con crema real",
            "Extracción al momento",
            "Ideal para viajes, oficina o universidad",
            "Mejor calidad que café instantáneo",
            "Ahorro frente a cafeterías"
        ],
        incluye: ["Batidora de mano de regalo"]
    },
    {
        id: 2,
        nombre: "Máquina Multifunción de Leche Vegetal",
        precio: 199,
        imagen: "lechemaq.png",
        video: "videoleche.mp4",
        descripcion: "Máquina automática que prepara leches vegetales, cremas, papillas y batidos. Cocina y licúa al mismo tiempo.",
        caracteristicas: [
            "Panel digital táctil",
            "Prepara leches vegetales, cremas y papillas",
            "Autolimpieza",
            "Apagado automático"
        ],
        especificaciones: {
            "Panel": "Digital táctil",
            "Material": "Acero inoxidable / BPA free",
            "Capacidad útil": "1.0 Litro (2-3 porciones)",
            "Capacidad total": "1.2 Litros",
            "Peso": "1.5 - 2 kg",
            "Tiempo de preparación": "~15 minutos"
        },
        beneficios: [
            "Leches vegetales en casa",
            "Sin conservantes ni azúcares ocultos",
            "Ahorro económico",
            "Sostenible - Reduce envases",
            "Reutiliza pulpa (Okara)"
        ],
        funciones: {
            "Soy Milk": "Leche vegetal caliente",
            "Juice": "Jugos y smoothies en frío",
            "Rice Paste": "Cremas y papillas",
            "Keep Warm": "Mantener caliente",
            "Boil Water": "Hervir agua",
            "Cleaning": "Autolimpieza"
        }
    }
];

// ===== REVIEWS DATA =====
const reviewsData = [
    {
        nombre: "María García",
        rating: 5,
        text: "Excelente cafetera, hace un espresso delicioso. Llegó rapidísimo a mi casa en Lima. Muy recomendada!",
        product: "☕ Cafetera Espresso",
        date: "12 de enero de 2025"
    },
    {
        nombre: "Juan Pérez",
        rating: 4.5,
        text: "La máquina de leche vegetal es increíble. Prepara leche de avena en 3 minutos. Entrega rápida.",
        product: "🥛 Máquina Leche Vegetal",
        date: "18 de enero de 2025"
    },
    {
        nombre: "Ana López",
        rating: 5,
        text: "Compré la cafetera para llevar al trabajo. La batería dura todo el día. Muy buena calidad.",
        product: "☕ Cafetera Espresso",
        date: "25 de enero de 2025"
    },
    {
        nombre: "Carlos Mendoza",
        rating: 4,
        text: "Máquina de leche vegetal funciona perfecto. Un poco ruidosa pero hace muy bien su trabajo.",
        product: "🥛 Máquina Leche Vegetal",
        date: "3 de febrero de 2025"
    },
    {
        nombre: "Sandra Rodríguez",
        rating: 5,
        text: "¡Amor a primera vista! La cafetera portátil es compacta y deliciosa. Pago contra entrega muy fácil.",
        product: "☕ Cafetera Espresso",
        date: "8 de febrero de 2025"
    },
    {
        nombre: "Roberto Flores",
        rating: 4.5,
        text: "La máquina prepara batidos y papillas también. Es 3 en 1. Súper versátil. Muy contento.",
        product: "🥛 Máquina Leche Vegetal",
        date: "14 de febrero de 2025"
    },
    {
        nombre: "Patricia Muñoz",
        rating: 5,
        text: "Cafetera de viaje perfecta. He viajado a provincias y funciona genial. Envío gratis al Perú entero.",
        product: "☕ Cafetera Espresso",
        date: "20 de febrero de 2025"
    },
    {
        nombre: "Miguel Torres",
        rating: 4.5,
        text: "Máquina muy intuitiva. El panel táctil es de fácil uso. Resultado: leche perfecta siempre.",
        product: "🥛 Máquina Leche Vegetal",
        date: "28 de febrero de 2025"
    },
    {
        nombre: "Lucía Sánchez",
        rating: 5,
        text: "Mejor inversión de 2025. La cafetera me ahorra dinero en cafeterías. Recomendado 100%.",
        product: "☕ Cafetera Espresso",
        date: "5 de marzo de 2025"
    },
    {
        nombre: "Diego Vargas",
        rating: 4,
        text: "La máquina de leche vegetal es eco-friendly. Buena alternativa a los tetrapacks.",
        product: "🥛 Máquina Leche Vegetal",
        date: "12 de marzo de 2025"
    },
    {
        nombre: "Elena Castro",
        rating: 5,
        text: "Cafetera premium a precio accesible. Batidora de regalo incluida. Excelente servicio.",
        product: "☕ Cafetera Espresso",
        date: "18 de marzo de 2025"
    },
    {
        nombre: "Fernando González",
        rating: 4.5,
        text: "Autolimpieza la máquina. Mantenimiento muy fácil. Durará años. Buena compra.",
        product: "🥛 Máquina Leche Vegetal",
        date: "24 de marzo de 2025"
    },
    {
        nombre: "Gabriela Herrera",
        rating: 5,
        text: "Espresso con crema real. Presión de 20 bares. Es profesional para la casa.",
        product: "☕ Cafetera Espresso",
        date: "2 de abril de 2025"
    },
    {
        nombre: "Óscar Jiménez",
        rating: 4.5,
        text: "Máquina compacta pero potente. Prepara hasta 3 porciones por uso. Perfecto para familia.",
        product: "🥛 Máquina Leche Vegetal",
        date: "8 de abril de 2025"
    },
    {
        nombre: "Rita Valdez",
        rating: 5,
        text: "Entrega en 5 días a Arequipa. Embalaje perfecto. Cafetera impecable. Muchas gracias BeeTec!",
        product: "☕ Cafetera Espresso",
        date: "15 de abril de 2025"
    },
    {
        nombre: "Valentín Reyes",
        rating: 4,
        text: "La máquina prepara leches vegetales deliciosas. Recomiendo la de avena. Calidad garantizada.",
        product: "🥛 Máquina Leche Vegetal",
        date: "22 de abril de 2025"
    },
    {
        nombre: "Marcela Suárez",
        rating: 5,
        text: "Cafetera con garantía. Servicio al cliente rápido. Calidad internacional en Perú.",
        product: "☕ Cafetera Espresso",
        date: "29 de abril de 2025"
    },
    {
        nombre: "Andrés Medina",
        rating: 4.5,
        text: "Máquina robusta. He preparado más de 500 litros de leche. Sin fallas.",
        product: "🥛 Máquina Leche Vegetal",
        date: "6 de mayo de 2025"
    },
    {
        nombre: "Claudia Ramos",
        rating: 5,
        text: "La cafetera es un regalo de verdad. Cambia tu forma de disfrutar el café. Imprescindible.",
        product: "☕ Cafetera Espresso",
        date: "13 de mayo de 2025"
    }
];

// Carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initChatbot();
    initReviews();
});

function initializeApp() {
    renderProducts();
    setupNavbar();
    setupCartToggle();
    updateCartCount();
}

// Renderizar productos
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.nombre}</h3>
                <div class="product-price">S/ ${product.precio}</div>
                <p class="product-description">${product.descripcion}</p>
                <ul class="product-features">
                    ${product.caracteristicas.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn-product" onclick="event.stopPropagation(); openProductModal(${product.id})">
                    Ver Detalles
                </button>
            </div>
        </div>
    `).join('');
}

// Modal de producto
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    
    // Cargar video directamente
    const videoEl = document.getElementById('modal-video');
    videoEl.src = currentProduct.video;
    
    document.getElementById('modal-title').textContent = currentProduct.nombre;
    document.getElementById('modal-price').textContent = currentProduct.precio;
    
    // Especificaciones
    const specsHtml = Object.entries(currentProduct.especificaciones)
        .map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    document.getElementById('modal-specs').innerHTML = specsHtml;
    
    // Beneficios
    const benefitsHtml = `
        <h3>Beneficios</h3>
        ${currentProduct.beneficios.map(b => `<div class="benefit-item">${b}</div>`).join('')}
    `;
    document.getElementById('modal-benefits').innerHTML = benefitsHtml;
    
    // Resetear cantidad
    document.getElementById('qty-input').value = 1;
    
    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    const videoEl = document.getElementById('modal-video');
    videoEl.pause();
}

// Controles de cantidad
function increaseQty() {
    const input = document.getElementById('qty-input');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.getElementById('qty-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Agregar al carrito
function addToCart() {
    const qty = parseInt(document.getElementById('qty-input').value);
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: currentProduct.id,
            nombre: currentProduct.nombre,
            precio: currentProduct.precio,
            imagen: currentProduct.imagen,
            quantity: qty
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeProductModal();
    
    // Mostrar confirmación
    showNotification(`${currentProduct.nombre} añadido al carrito`);
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4ade80;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 3000);
}

// Carrito
function openCart() {
    document.getElementById('cart-sidebar').classList.remove('hidden');
    renderCart();
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.add('hidden');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">Tu carrito está vacío</div>';
        cartTotal.textContent = 'S/ 0.00';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const subtotal = item.precio * item.quantity;
        total += subtotal;
        return `
            <div class="cart-item">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">S/ ${item.precio} x ${item.quantity}</div>
                <div class="cart-item-controls">
                    <button onclick="updateCartQty(${item.id}, ${item.quantity - 1})">−</button>
                    <span style="color: var(--accent);">${item.quantity}</span>
                    <button onclick="updateCartQty(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `S/ ${total.toFixed(2)}`;
}

function updateCartQty(productId, newQty) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        if (newQty <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const cartBtn = document.querySelector('.cart-icon');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (count > 0) {
        let badge = cartBtn.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.classList.add('cart-badge');
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--primary);
                color: var(--secondary);
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: bold;
            `;
            cartBtn.style.position = 'relative';
            cartBtn.appendChild(badge);
        }
        badge.textContent = count;
    }
}

// Checkout
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    loadCities();
    renderSummary();
    closeCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function renderSummary() {
    const summary = document.getElementById('summary-items');
    let total = 0;
    
    summary.innerHTML = cart.map(item => {
        const subtotal = item.precio * item.quantity;
        total += subtotal;
        return `
            <div class="summary-item">
                <span>${item.nombre} x${item.quantity}</span>
                <span>S/ ${subtotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('summary-total').textContent = `S/ ${total.toFixed(2)}`;
}

function submitOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const order = {
        cliente: {
            nombre: formData.get('nombre'),
            dni: formData.get('dni'),
            telefono: formData.get('telefono'),
            correo: formData.get('correo')
        },
        entrega: {
            ciudad: formData.get('ciudad'),
            direccion: formData.get('direccion'),
            referencia: formData.get('referencia')
        },
        pago: formData.get('metodo_pago'),
        productos: cart,
        total: cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0),
        fecha: new Date().toLocaleString('es-ES')
    };
    
    // Guardar orden
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Crear mensaje para WhatsApp
    const summary = cart.map(p => `${p.nombre} x${p.quantity}`).join('\n');
    const whatsappMessage = `Hola, quiero confirmar mi pedido:\n\n${summary}\n\nNombre: ${order.cliente.nombre}\nDNI: ${order.cliente.dni}\nCiudad: ${order.entrega.ciudad}`;
    const whatsappURL = `https://wa.me/51900000000?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Limpiar carrito
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    closeCheckout();
    showSuccess(order);
    
    // Redirigir a WhatsApp después de 2 segundos
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 2000);
}

function showSuccess(order) {
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('success-message');
    
    message.textContent = `Tu pedido ha sido confirmado. Te enviaremos un WhatsApp a ${order.cliente.telefono} con los detalles de tu entrega. Total: S/ ${order.total.toFixed(2)}`;
    modal.classList.remove('hidden');
}

function closeSuccess() {
    document.getElementById('success-modal').classList.add('hidden');
}

// Navbar
function setupNavbar() {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function setupCartToggle() {
    const cartBtn = document.getElementById('cart-toggle');
    cartBtn.addEventListener('click', openCart);
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', (e) => {
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const successModal = document.getElementById('success-modal');
    
    if (e.target === productModal) closeProductModal();
    if (e.target === checkoutModal) closeCheckout();
    if (e.target === successModal) closeSuccess();
});

// Tecla ESC para cerrar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCheckout();
        closeSuccess();
    }
});

// Ciudades de Perú
const peruCities = [
    "Selecciona una ciudad",
    "Lima",
    "Arequipa",
    "Cusco",
    "Trujillo",
    "Chiclayo",
    "Piura",
    "Iquitos",
    "Pucallpa",
    "Tacna",
    "Huancayo",
    "Ayacucho",
    "Puno",
    "Huaraz",
    "Cajamarca",
    "Ica",
    "Huánuco",
    "Tingo María",
    "Puerto Maldonado",
    "Moquegua",
    "Chimbote",
    "Cerro de Pasco",
    "Satipo",
    "La Oroya",
    "Chincha",
    "Nazca"
];

// Cargar ciudades en el selector
function loadCities() {
    const citySelect = document.querySelector('select[name="ciudad"]');
    if (!citySelect) return;
    
    citySelect.innerHTML = peruCities.map((city, index) => {
        if (index === 0) {
            return `<option value="" disabled selected>${city}</option>`;
        }
        return `<option value="${city}">${city}</option>`;
    }).join('');
}

// ===== CHATBOT =====

// Datos del chatbot para la cafetera portátil
const caféData = {
  "flujos": {
    "lima": {
      "botones": ["pedido", "pago", "entrega"],
      "mensaje": "🚚 Lima:\n✅ Pago contraentrega\n✅ Envío GRATIS\n⏱️ 24h"
    },
    "color": {
      "botones": ["precio", "envios", "comprar"],
      "mensaje": "Disponible en color negro 🖤"
    },
    "pedido": {
      "mensaje": "Envíanos:\n✅ Nombre\n✅ DNI\n✅ Dirección\n✅ Ciudad\n✅ Referencia\n✅ Método de pago"
    },
    "precio": {
      "botones": ["como_funciona", "compatibilidad", "envios", "comprar"],
      "mensaje": "🔥 Precio: S/199\n🎁 Incluye batidora de regalo\n🔥 20 bares de presión\n🔋 Batería 7800 mAh"
    },
    "bateria": {
      "botones": ["portabilidad", "precio", "envios", "comprar"],
      "mensaje": "🔋 7800 mAh\n☕ 4-5 tazas (frío)\n☕ 100 (caliente)\n⏱️ 3-3.5h carga"
    },
    "comprar": {
      "mensaje": "¿En qué ciudad estás? 🚚",
      "opciones": ["lima", "provincia", "otra"]
    },
    "entrega": {
      "mensaje": "🚚 Lima: 24h\n🚚 Provincias: 2-3 días"
    },
    "presion": {
      "botones": ["portabilidad", "bateria", "precio", "comprar"],
      "mensaje": "🔥 20 bares de presión\n☕ Espresso con crema real\n☕ Sabor tipo cafetería"
    },
    "provincia": {
      "botones": ["pago", "comprar", "seguridad"],
      "mensaje": "🚚 Provincias:\n💰 Adelanto S/20\n💵 Saldo al recibir\n🚚 Envío GRATIS"
    },
    "seguridad": {
      "mensaje": "✔️ Número de guía\n✔️ Seguimiento\n✔️ Soporte"
    },
    "beneficios": {
      "botones": ["como_funciona", "compatibilidad", "precio", "comprar"],
      "mensaje": "☕ Espresso con crema real\n🚗 Ideal para viajes\n🔋 Recargable\n💸 Ahorro frente a cafeterías"
    },
    "bienvenida": {
      "botones": ["precio", "como_funciona", "compatibilidad", "envios", "comprar"],
      "mensaje": "¡Hola! 👋 Nuestra máquina portátil de café espresso 3 en 1 te permite preparar café donde quieras ☕🔥"
    },
    "portabilidad": {
      "botones": ["bateria", "precio", "envios", "comprar"],
      "mensaje": "🎒 Portátil\n🔋 Sin enchufe\n🚗 Ideal para viajes"
    },
    "como_funciona": {
      "botones": ["presion", "portabilidad", "precio", "comprar"],
      "mensaje": "1. Agregas agua\n2. Colocas café\n3. Presionas botón\n🔥 Lista en 3-4 min"
    },
    "compatibilidad": {
      "botones": ["como_funciona", "presion", "precio", "comprar"],
      "mensaje": "Compatible con:\n☕ Nespresso\n☕ Dolce Gusto\n☕ Café molido"
    },
    "envios": {
      "botones": ["lima", "provincia", "otra_ciudad"],
      "mensaje": "🚚 Opciones de envío"
    },
    "otra_ciudad": {
      "botones": ["pago", "seguridad", "comprar"],
      "mensaje": "🚚 Envío por Shalom\n💰 Adelanto S/60\n💵 Saldo al recoger"
    },
    "pago": {
      "mensaje": "Aceptamos:\n💰 Efectivo\n💳 Transferencia\n📱 Billetera digital"
    }
  }
};

// Datos del chatbot para la máquina de leche vegetal
const lecheData = {
  "flujos": {
    "inicio": {
      "botones": ["precio", "como_funciona", "beneficios", "comprar"],
      "mensaje": "¡Hola! 👋 Gracias por escribirnos.\nTe cuento que nuestra Máquina Multifunción de Leche Vegetal te permite preparar leches vegetales, cremas, papillas, batidos y más de forma automática 🥛✨"
    },
    "precio": {
      "botones": ["que_prepara", "como_funciona", "envios", "comprar"],
      "mensaje": "🔥 La Máquina está en promoción a S/199.\n\n✅ Prepara leche de almendras, avena, coco, soya\n✅ También hace cremas, papillas, jugos\n✅ Cocina + licúa automáticamente\n✅ Autolimpieza"
    },
    "que_prepara": {
      "botones": ["como_funciona", "beneficios", "precio", "comprar"],
      "mensaje": "🥛 Leches vegetales: soya, almendra, avena, arroz, coco\n🥣 Cremas y papillas\n🍓 Batidos y smoothies\n💧 Hervir agua\n🧼 Autolimpieza"
    },
    "como_funciona": {
      "botones": ["tiempos", "que_prepara", "beneficios", "comprar"],
      "mensaje": "Es súper fácil:\n\n1️⃣ Agregas ingredientes y agua\n2️⃣ Cierras la tapa\n3️⃣ Seleccionas función\n4️⃣ Máquina tritura, mezcla y cocina\n5️⃣ Se apaga sola 🔄"
    },
    "tiempos": {
      "botones": ["que_prepara", "precio", "envios", "comprar"],
      "mensaje": "⏱️ La preparación demora aproximadamente 15 minutos\nEn ese tiempo: licúa, cocina y deja lista la bebida"
    },
    "beneficios": {
      "botones": ["que_prepara", "como_funciona", "precio", "comprar"],
      "mensaje": "✨ Prepara bebidas de forma rápida y práctica\n✅ Sin conservantes ni azúcares ocultos\n✅ Ahorro económico\n♻️ Sostenible - Reduce envases\n🔄 Reutiliza pulpa (Okara)"
    },
    "envios": {
      "botones": ["lima", "provincia", "otra_ciudad"],
      "mensaje": "🚚 Opciones de envío disponibles"
    },
    "lima": {
      "botones": ["comprar", "pago"],
      "mensaje": "🎉 En Lima y Callao:\n✅ Pagas cuando recibes (contraentrega)\n✅ Envío GRATIS\n✅ Entrega en 24 horas"
    },
    "provincia": {
      "botones": ["comprar", "pago"],
      "mensaje": "🚚 Para provincia:\n✅ Adelanto: S/20\n✅ Saldo contraentrega\n✅ Envío GRATIS"
    },
    "otra_ciudad": {
      "botones": ["comprar", "pago"],
      "mensaje": "🚚 Otras ciudades con Shalom:\n💰 Adelanto: S/60\n✅ Saldo al recoger"
    },
    "pago": {
      "mensaje": "Aceptamos:\n💰 Efectivo\n💳 Transferencia\n📱 Billetera digital"
    },
    "comprar": {
      "mensaje": "¡Perfecto! 🎉\n\nPuedes hacer tu pedido:\n📱 Vía WhatsApp\n📧 Por email\n🛒 Desde nuestra tienda online"
    }
  }
};

// Variables del chatbot
let chatbotState = {
  currentFlow: 'menu',
  selectedProduct: null
};

// Mapeo de botones a flujos
const buttonLabels = {
  // Comunes
  'comprar': '🛒 Quiero comprar',
  'envios': '🚚 Envíos',
  'pago': '💰 Métodos de pago',
  'precio': '💰 Precio y características',
  'beneficios': '✨ Beneficios',
  'como_funciona': '⚙️ Cómo funciona',
  'compatibilidad': '✅ Compatibilidad',
  'portabilidad': '🎒 Portabilidad',
  'presion': '🔥 Presión 20 bares',
  'bateria': '🔋 Batería',
  'color': '🖤 Color disponible',
  'pedido': '📝 Datos para pedido',
  'entrega': '⏱️ Tiempo de entrega',
  'seguridad': '✔️ Seguridad',
  'lima': '📍 Soy de Lima',
  'provincia': '📍 Soy de provincias',
  'otra_ciudad': '📍 Otra ciudad',
  'que_prepara': '🥛 Qué prepara',
  'tiempos': '⏱️ Tiempo de preparación'
};

function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const container = document.getElementById('chatbot-container');
  
  toggle.addEventListener('click', () => {
    container.classList.toggle('chatbot-hidden');
    if (!container.classList.contains('chatbot-hidden')) {
      showChatbotMenu();
    }
  });
  
  closeBtn.addEventListener('click', () => {
    container.classList.add('chatbot-hidden');
  });
}

function showChatbotMenu() {
  const messagesDiv = document.getElementById('chatbot-messages');
  const buttonsDiv = document.getElementById('chatbot-buttons');
  
  messagesDiv.innerHTML = '';
  
  addBotMessage('¡Bienvenido a BeeTec Shop! 👋\n\n¿En qué te puedo ayudar?');
  
  buttonsDiv.innerHTML = `
    <button class="chatbot-btn" onclick="selectProduct('cafe')">
      ☕ Máquina Portátil de Café Espresso
    </button>
    <button class="chatbot-btn" onclick="selectProduct('leche')">
      🥛 Máquina Multifunción de Leche Vegetal
    </button>
  `;
}

function selectProduct(product) {
  chatbotState.selectedProduct = product;
  const data = product === 'cafe' ? caféData : lecheData;
  const startFlow = product === 'cafe' ? 'bienvenida' : 'inicio';
  showFlow(data, startFlow);
}

function showFlow(data, flowKey) {
  const flow = data.flujos[flowKey];
  if (!flow) return;
  
  addBotMessage(flow.mensaje);
  
  const buttonsDiv = document.getElementById('chatbot-buttons');
  buttonsDiv.innerHTML = '';
  
  if (flow.botones) {
    flow.botones.forEach(btn => {
      const label = buttonLabels[btn] || btn;
      buttonsDiv.innerHTML += `
        <button class="chatbot-btn" onclick="handleButtonClick('${btn}', '${chatbotState.selectedProduct === 'cafe' ? 'cafe' : 'leche'}')">
          ${label}
        </button>
      `;
    });
  }
  
  // Scrollear al final
  const messagesDiv = document.getElementById('chatbot-messages');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleButtonClick(buttonKey, product) {
  const data = product === 'cafe' ? caféData : lecheData;
  chatbotState.selectedProduct = product;
  
  addUserMessage(buttonLabels[buttonKey] || buttonKey);
  showFlow(data, buttonKey);
}

function addBotMessage(text) {
  const messagesDiv = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-message bot';
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
}

function addUserMessage(text) {
  const messagesDiv = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-message user';
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
}

// ===== REVIEWS CAROUSEL =====
let reviewsAutoScrollInterval = null;
let reviewsAutoScrollTimeout = null;

function initReviews() {
  const reviewsTrack = document.getElementById('reviews-track');
  
  // Mezclar los comentarios aleatoriamente
  const shuffledReviews = [...reviewsData].sort(() => Math.random() - 0.5);
  
  // Crear las tarjetas de comentarios
  shuffledReviews.forEach(review => {
    const stars = '★'.repeat(Math.floor(review.rating)) + (review.rating % 1 !== 0 ? '½' : '');
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
      <div class="review-header">
        <div>
          <div class="review-name">${review.nombre}</div>
          <div class="review-date">${review.date}</div>
        </div>
      </div>
      <div class="review-rating">
        <span class="star">${stars}</span>
        <span class="rating-text">${review.rating}</span>
      </div>
      <div class="review-text">"${review.text}"</div>
      <div class="review-product">${review.product}</div>
    `;
    reviewsTrack.appendChild(reviewCard);
  });
  
  // Iniciar auto-scroll
  startReviewsAutoScroll();
  
  // Detener auto-scroll cuando el usuario interactúa
  reviewsTrack.addEventListener('scroll', stopReviewsAutoScroll);
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', stopReviewsAutoScroll);
  });
}

function startReviewsAutoScroll() {
  const reviewsTrack = document.getElementById('reviews-track');
  
  // Limpiar cualquier intervalo anterior
  if (reviewsAutoScrollInterval) clearInterval(reviewsAutoScrollInterval);
  if (reviewsAutoScrollTimeout) clearTimeout(reviewsAutoScrollTimeout);
  
  // Auto-scroll cada 2.2 segundos
  reviewsAutoScrollInterval = setInterval(() => {
    const scrollAmount = 340; // card width (320) + gap (20)
    reviewsTrack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, 2200);
}

function stopReviewsAutoScroll() {
  // Detener auto-scroll actual
  if (reviewsAutoScrollInterval) {
    clearInterval(reviewsAutoScrollInterval);
    reviewsAutoScrollInterval = null;
  }
  
  // Reiniciar auto-scroll después de 10 segundos de inactividad
  if (reviewsAutoScrollTimeout) clearTimeout(reviewsAutoScrollTimeout);
  reviewsAutoScrollTimeout = setTimeout(() => {
    startReviewsAutoScroll();
  }, 10000);
}

function scrollReviews(direction) {
  const reviewsTrack = document.getElementById('reviews-track');
  const scrollAmount = 340; // card width (320) + gap (20)
  reviewsTrack.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
  
  // Reiniciar el auto-scroll después de interacción manual
  stopReviewsAutoScroll();
}
