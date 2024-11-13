import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './ContactPage.css';  // Estilos CSS

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); 

  useEffect(() => {
    fetch('http://localhost:9092/traversal/api/contact/672b0e95d319b6137673187f')
      .then(response => response.json())
      .then(data => {
        setContactInfo(data);
        setLoading(false);

        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(data.address)}&key=TU_API_KEY`;
        
        fetch(geocodeUrl)
          .then(response => response.json())
          .then(geoData => {
            if (geoData.status === 'OK') {
              const location = geoData.results[0].geometry.location;
              setMapCenter({ lat: location.lat, lng: location.lng });
            }
          })
          .catch(err => setError('No se pudo obtener las coordenadas de la dirección.'));
      })
      .catch(err => {
        setError('No se pudo obtener la información de contacto');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formattedWhatsApp = contactInfo.whatsapp.replace(/\s+/g, '');

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>SERVICIO AL CLIENTE</h1>
        <h2>CONTÁCTENOS:</h2>
        <p>Conoce nuestra información de contacto y cómo llegar a nosotros.</p>
      </section>

      <section className="contact-details">
        <div className="contact-info">
          <div className="contact-card">
            <h3>Información de Contacto</h3>
            <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${formattedWhatsApp}`} target="_blank" rel="noopener noreferrer">{contactInfo.whatsapp} - Enviar mensaje</a></p>
            <p><strong>Facebook:</strong> <a href={`https://facebook.com/${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer">{contactInfo.facebook}</a></p>
            <p><strong>Dirección:</strong> {contactInfo.address}</p>
          </div>
        </div>
        
        {/* Mapa */}
      </section>
    </div>
  );
};

export default ContactPage;
