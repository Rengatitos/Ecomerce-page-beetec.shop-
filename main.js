document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const contactForm = document.querySelector('.contact-form');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Simple reveal animation on scroll
    const revealElements = document.querySelectorAll('.product-card, .contact-info, .contact-form-container');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize reveal styles
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = '¡Enviado con éxito!';
                btn.style.backgroundColor = '#25D366';
                btn.style.borderColor = '#25D366';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    const messageField = document.getElementById('message');
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1GmZS3VnTbVcNXwYoCUnl2Q69HxyCu8EizMHlRjF6GJEKLENpaDxAq8jf3al8Hq8M6U6o5Y8CdOaJ/pub?gid=0&single=true&output=csv';

    function getDriveImage(id) {
        if (!id) return "/placeholder.png";
        return `https://lh3.googleusercontent.com/d/${id.trim()}`;
    }

    async function fetchProducts() {
        const grid = document.getElementById('product-grid');
        if (grid) grid.innerHTML = '<div class="loading">Cargando productos seleccionados para ti...</div>';

        try {
            const response = await fetch(CSV_URL);
            const csvText = await response.text();
            const products = parseCSV(csvText);
            console.log(products);
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (grid) grid.innerHTML = '<div class="error">Ups! No pudimos cargar el catálogo. Intenta de nuevo más tarde.</div>';
        }
    }

    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const result = [];

        // Detectar separador automáticamente
        let delimiter = ',';

        if (csvText.includes('\t')) {
            delimiter = '\t';
        } else if (csvText.includes(';')) {
            delimiter = ';';
        }

        // Obtener headers correctamente
        const headers = lines[0].split(delimiter).map(h => h.trim());

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const columns = line.split(delimiter);

            if (columns.length >= headers.length) {
                let obj = {};

                headers.forEach((header, index) => {
                    obj[header] = columns[index]?.trim();
                });

                result.push(obj);
            }
        }

        return result;
    }

    function renderProducts(products) {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        // Filter active products
        const activeProducts = products.filter(p => p.estado && p.estado.trim().includes('Activo'));

        if (activeProducts.length === 0) {
            grid.innerHTML = '<div class="info">Por el momento no hay productos activos. ¡Vuelve pronto!</div>';
            return;
        }

        grid.innerHTML = activeProducts.map(product => {
            const tieneOferta = product.oferta && product.oferta.trim().toLowerCase() === 'si';
            const precioMostrado = tieneOferta ? product["precio-oferta"] : product["precio-normal"];
            const precioAnterior = tieneOferta ? product["precio-normal"] : null;

            return `
                <div class="product-card">
                    <div class="product-img">
                        ${tieneOferta ? `<span class="sale-tag">OFERTA</span>` : ''}
                        <img src="${getDriveImage(product.imagen)}" alt="${product.descripcion}" onerror="this.onerror=null; this.src='/placeholder.png';">
                    </div>
                    <div class="product-info">
                        <h3>${product.descripcion}</h3>
                        <p class="price">S/ ${precioMostrado} ${tieneOferta ? `<span class="old-price">S/ ${precioAnterior}</span>` : ''}</p>
                        <a href="#contact" class="btn btn-outline buy-btn" data-product="${product.descripcion}">¡Lo quiero!</a>
                    </div>
                </div>
            `;
        }).join('');

        // Re-attach listeners for buy buttons since they are now dynamic
        attachBuyListeners();
    }

    function attachBuyListeners() {
        const buyButtons = document.querySelectorAll('.buy-btn');
        buyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.getAttribute('data-product');
                if (messageField) {
                    messageField.value = `Hola BeeTec, me interesa el producto: ${product}. ¿Podrían darme más información?`;
                    messageField.style.borderColor = '#FFD700';
                    messageField.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
                    setTimeout(() => {
                        messageField.style.borderColor = '';
                        messageField.style.boxShadow = '';
                    }, 1000);
                }
            });
        });
    }

    // Initialize products
    fetchProducts();

    // Smooth scroll for nav links (modified to handle buy buttons)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Adjust for sticky header
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
});
