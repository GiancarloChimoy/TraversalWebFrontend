// src/components/pages/Inicio.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Inicio.css'; // Importar estilos
import CarouselComponent from '../components/Carousel/CarouselComponent';

function Inicio() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Carga los banners

        // Carga los productos
        fetch('http://localhost:9092/traversal/api/product/')
            .then(response => response.json())
            .then(data => {
                // Filtra los productos para obtener solo los de mayor oferta
                const sortedProducts = data
                    .filter(product => product.offer > 0) // Filtra solo los productos con oferta
                    .sort((a, b) => b.offer - a.offer) // Ordena de mayor a menor oferta
                    .slice(0, 3); // Toma solo los 3 primeros
                setProducts(sortedProducts);
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }, []);

    return (
        <div>
      {/* Carrusel en la parte superior */}
      <CarouselComponent />

      {/* Sección de productos */}
      <div className="products-section-container">
        <div className="products-section">
          <h2>Productos en Oferta</h2>
          <div className="products-list">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <img
                  src={`data:image/jpeg;base64,${product.imagen}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Precio: ${product.price.toFixed(2)}</p>
                <p>Oferta: {product.offer}%</p>
              </div>
            ))}
          </div>
          <Link to="/productos" className="view-more">Ver más</Link>
        </div>
      </div>

      {/* Aquí podrías agregar más secciones como novedades, descuentos, etc. */}
    </div>
    );
}


export default Inicio;
