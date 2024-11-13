// src/pages/FAQ.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Importamos los íconos de flecha
import './FAQ.css';
import CarouselComponent from '../components/Carousel/CarouselComponent';

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:9092/traversal/api/content/');
        const data = response.data.filter(item => item.type === 4); // Filtramos solo los FAQs
        setFaqs(data);
      } catch (error) {
        console.error('Error al obtener los FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = index => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div>
      <CarouselComponent />
      <div className="faq-container">
        <h1>Preguntas Frecuentes</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-header" onClick={() => toggleFaq(index)}>
              <h2>{faq.title}</h2>
              {/* Agregamos la flecha que cambia según el estado */}
              <span className="arrow-icon">
                {openFaqIndex === index ? <FaArrowUp /> : <FaArrowDown />}
              </span>
            </div>
            {openFaqIndex === index && (
              <div className="faq-content">
                {faq.imagen && (
                  <img
                    src={`data:image/jpeg;base64,${faq.imagen}`}
                    alt={faq.title}
                    className="faq-image"
                  />
                )}
                <p>{faq.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default FAQ;
