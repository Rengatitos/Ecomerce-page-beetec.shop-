import React from 'react';
import '../styles/CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-filter">
            <div className="filter-container">
                <button 
                    className={`filter-btn ${selectedCategory === 'todas' ? 'active' : ''}`}
                    onClick={() => onCategoryChange('todas')}
                >
                    Ver Todo
                </button>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category.id)}
                    >
                        {category.nombre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
