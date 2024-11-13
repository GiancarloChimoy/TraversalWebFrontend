// Product.js
import React, { useState, useEffect } from 'react';
import './Product.css';
import QuoteModal from './QuoteModal'; // Importa el modal de cotización

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [availableTypes, setAvailableTypes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
    const [quoteData, setQuoteData] = useState({
        name: '',
        phone: '',
        email: '',
        quantity: 1,
        description: ''
    }); // Estado para los datos del formulario

    // Función para obtener los productos desde la API
    useEffect(() => {
        fetch('http://localhost:9092/traversal/api/product/')
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data
                    .filter(product => product.offer > 0)
                    .sort((a, b) => b.offer - a.offer)
                    .slice(0, 10);

                setProducts(sortedProducts);

                const types = [...new Set(data.map(product => product.type))];
                setAvailableTypes(types);
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }, []);

    // Función para manejar el filtrado
    useEffect(() => {
        setFilteredProducts(
            products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

                const matchesPrice = priceFilter === "all" ||
                    (priceFilter === "lessThan50" && product.price < 50) ||
                    (priceFilter === "50to100" && product.price >= 50 && product.price <= 100) ||
                    (priceFilter === "moreThan100" && product.price > 100);

                const matchesType = typeFilter === "all" || product.type === typeFilter;

                const matchesAvailability = availabilityFilter === "all" ||
                    (availabilityFilter === "available" && product.price > 0) ||
                    (availabilityFilter === "unavailable" && product.price === 0);

                return matchesSearch && matchesPrice && matchesType && matchesAvailability;
            })
        );
    }, [search, priceFilter, typeFilter, availabilityFilter, products]);

    // Función para manejar el envío de la cotización
    // Función para manejar el envío de la cotización
    // Función para manejar el envío de la cotización
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                setSelectedProduct(null); // Cierra el modal al presionar Esc
            }
        };

        // Añadir el listener de la tecla Esc
        window.addEventListener("keydown", handleEscKey);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [setSelectedProduct]);

    const handleQuoteSubmit = (e) => {
        e.preventDefault();

        // Verificar que todos los campos requeridos estén completos
        if (!quoteData.name || !quoteData.phone || !quoteData.email || !quoteData.quantity) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Asegúrate de que el selectedProduct contiene el code del producto seleccionado
        if (!selectedProduct) {
            alert("Por favor, seleccione un producto.");
            return;
        }

        const requestPayload = {
            productCode: selectedProduct.code, // Ahora usamos el code en lugar de id
            date: new Date().toISOString(),  // Asegúrate de que el formato sea adecuado para LocalDateTime si es necesario
            ...quoteData,  // Aquí se están agregando los datos del formulario de cotización
        };

        console.log(requestPayload);  // Agrega esto para depurar el contenido enviado

        fetch('http://localhost:9092/traversal/api/quote/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Cotización enviada con éxito:', data);
                alert("Cotización enviada con éxito.");
                setSelectedProduct(null);  // Limpiar la selección del producto
                setQuoteData({ name: '', phone: '', email: '', quantity: 1, description: '' });  // Limpiar los datos del formulario
            })
            .catch(error => {
                console.error('Error al enviar cotización:', error);
                alert("Hubo un error al enviar la cotización.");
            });
    };


    return (
        <div className="product-page">
            <h1>Catálogo de Productos</h1>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* Filtros */}
            <div className="filters">
                <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
                    <option value="all">Todos los precios</option>
                    <option value="lessThan50">Menos de S/50</option>
                    <option value="50to100">S/50 - S/100</option>
                    <option value="moreThan100">Más de S/100</option>
                </select>

                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Todos los tipos</option>
                    {availableTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <select value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="available">Disponibles</option>
                    <option value="unavailable">No disponibles</option>
                </select>
            </div>

            {/* Lista de Productos */}
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id}>
                        <img
                            src={`data:image/jpeg;base64,${product.imagen}`}
                            alt={product.name}
                            className="product-image"
                        />
                        <h2>{product.name}</h2>
                        <p>Precio: S/{product.price}</p>
                        <p>Descuento: {product.offer}%</p>
                        <button className="view-more" onClick={() => setSelectedProduct(product)}>Solicitar Cotización</button>
                    </div>
                ))}
            </div>

            {/* Mostrar el Modal si hay un producto seleccionado */}
            {selectedProduct && (
                <QuoteModal
                    quoteData={quoteData}
                    setQuoteData={setQuoteData}
                    handleQuoteSubmit={handleQuoteSubmit}
                    setSelectedProduct={setSelectedProduct}
                    productName={selectedProduct.name}
                />
            )}
        </div>
    );
};

export default Product;
