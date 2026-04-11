import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

const categories = [
  { id: 'tendencias', nombre: 'Tendencias' },
  { id: 'hogar', nombre: 'Hogar' },
  { id: 'salud', nombre: 'Salud' },
  { id: 'bienestar', nombre: 'Bienestar' },
  { id: 'mascotas', nombre: 'Mascotas' },
  { id: 'infantil', nombre: 'Infantil' },
  { id: 'tecnologia', nombre: 'Tecnología' }
];

export default function Catalog({ onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filteredProducts = selectedCategory === 'todas' 
    ? products 
    : products.filter(product => product.categoria === selectedCategory);

  return (
    <section id="catalog" className="catalog">
      <div className="container">
        <div className="section-header">
          <h2>Nuestros <span className="highlight">Productos</span></h2>
          <p>Tecnología innovadora para mejorar tu día a día</p>
        </div>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
