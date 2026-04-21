import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '../styles/ProductGallery.css';

export default function ProductGallery({ productId }) {
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="product-gallery-container">
      <div className="main-swiper-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Autoplay]}
          spaceBetween={10}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="product-main-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => { e.target.src = '/images/placeholder.webp'; }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </div>

      {/* Thumbnails solo con imágenes */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        className="product-thumbnails"
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="thumbnail-slide">
            <img 
              src={image.src} 
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-image"
              onError={(e) => { e.target.src = '/images/placeholder.webp'; }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}