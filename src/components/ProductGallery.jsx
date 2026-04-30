import { useState, useEffect } from 'react';
import '../styles/ProductGallery.css';

export default function ProductGallery({ productId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mapeo de IDs de productos a carpetas
  const productFolders = {
    1: 'cafetera',
    2: 'leche',
    3: 'alfombra',
    4: 'camara',
    5: 'cepillo',
    8: 'secadora',
    13: 'calentador',
    15: 'miniRefri'
  };

  useEffect(() => {
    const folderName = productFolders[productId];
    if (!folderName) {
      setLoading(false);
      return;
    }

    const loadImages = () => {
      const imageList = [];
      let loadAttempts = 0;
      const maxAttempts = 21; // Escaneo de 0.webp a 20.webp
      
      const completeLoading = () => {
        if (imageList.length === 0) {
          setImages([]);
        } else {
          // Ordenar imágenes por número de archivo
          imageList.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
          setImages(imageList);
        }
        setLoading(false);
      };
      
      for (let i = 0; i <= 20; i++) {
        const imagePath = `/images/productsPages/${folderName}/${i}.webp`;
        const img = new Image();
        
        img.onload = () => {
          imageList.push({
            src: imagePath,
            alt: `Producto vista ${i}`,
            type: 'image',
            number: i
          });
          loadAttempts++;
          if (loadAttempts === maxAttempts) completeLoading();
        };
        
        img.onerror = () => {
          loadAttempts++;
          if (loadAttempts === maxAttempts) completeLoading();
        };
        
        img.src = imagePath;
      }
    };

    loadImages();
  }, [productId]);

  if (loading) return <div className="gallery-loading">Cargando imágenes...</div>;
  if (images.length === 0) return <div className="gallery-empty">No hay imágenes disponibles</div>;

  const currentImage = images[selectedIndex];

  return (
    <div className="product-gallery-container">
      {/* Imagen Principal Grande */}
      <div className="gallery-main-image">
        <img 
          src={currentImage.src} 
          alt={currentImage.alt}
          onError={(e) => { e.target.src = '/images/placeholder.webp'; }}
        />
      </div>

      {/* Thumbnails de Navegación */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`gallery-thumbnail ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`}
                onError={(e) => { e.target.src = '/images/placeholder.webp'; }}
              />
              <span className="thumbnail-number">{index + 1}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}