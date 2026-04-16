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
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('relevancia');

  const normalizeText = (text) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  let filteredProducts = products.filter(product => {
    // Filtro por categoría
    const categoryMatch = selectedCategory === 'todas' || product.categoria === selectedCategory;
    
    // Filtro por búsqueda
    const searchMatch = normalizeText(product.nombre).includes(normalizeText(searchInput));
    
    return categoryMatch && searchMatch;
  });

  // Aplicar ordenamiento
  if (sortBy === 'precio-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.precio - b.precio);
  } else if (sortBy === 'precio-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.precio - a.precio);
  } else if (sortBy === 'nombre') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  // 'relevancia' mantiene el orden original

  return (
    <section id="catalog" className="catalog">
      <div className="container">
        <div className="section-header">
          <h2>Nuestros <span className="highlight">Productos</span></h2>
          <p>Tecnología innovadora para mejorar tu día a día</p>
        </div>

        {/* Barra de búsqueda y ordenamiento */}
        <div className="search-filter-row">
          <input
            type="text"
            className="catalog-search-bar"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {/* Selector de ordenamiento */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Menor a Mayor Precio</option>
            <option value="precio-desc">Mayor a Menor Precio</option>
            <option value="nombre">Ordenar por Nombre</option>
          </select>
        </div>

        {/* Filtros por categoría */}
        <div className="filters-container">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <div className="no-products">
              <p>No se encontraron productos que coincidan con tus filtros</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
