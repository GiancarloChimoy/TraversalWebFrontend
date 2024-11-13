import React from 'react';
import './QuoteModal.css';

const QuoteModal = ({ quoteData, setQuoteData, handleQuoteSubmit, setSelectedProduct, productName }) => {
  return (
    <div className="quote-modal">
      <div className="modal-content">
        <h2>Formulario de Cotización</h2>
        <form onSubmit={handleQuoteSubmit}>
        <div className="product-name">
          <strong>Producto:</strong> <span>{productName}</span>
        </div>
          <label>
            Nombre:
            <input
              type="tel"
              value={quoteData.name}
              onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              value={quoteData.phone}
              onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={quoteData.email}
              onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
              required
            />
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              min="1"
              value={quoteData.quantity}
              onChange={(e) => setQuoteData({ ...quoteData, quantity: e.target.value })}
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={quoteData.description}
              onChange={(e) => setQuoteData({ ...quoteData, description: e.target.value })}
              required
            />
          </label>
          <button type="submit">Enviar Cotización</button>
        </form>
        <button onClick={() => setSelectedProduct(null)}>Cerrar</button>
      </div>
    </div>
  );
};

export default QuoteModal;
