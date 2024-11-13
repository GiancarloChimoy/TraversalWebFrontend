import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css';


const CarouselComponent = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los banners
    fetch('http://localhost:9092/traversal/api/banner/')
      .then(response => response.json())
      .then(data => {
        // Filtrar las imágenes activas
        const activeBanners = data.filter(banner => banner.active);
        setBanners(activeBanners);
      })
      .catch(error => console.error('Error fetching banners:', error));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <div className="carousel-container" style={{ marginBottom: '2rem' }}>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {banners.map((banner, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${banner.imageUrl}`}
                className="carousel-image"
                alt={banner.altText || `Imagen ${index + 1}`}
              />
              <p className="legend">{banner.altText || `Promoción ${index + 1}`}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;
