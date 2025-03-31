/* Estilos personalizados */
body {
    font-family: 'Orbitron', sans-serif;
    background-color: #1a202c;
}

.product-card {
    background-color: #2d3748;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: scale(1.05);
}

.product-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.btn-neon {
    background: none;
    border: 2px solid #00f7ff;
    color: #00f7ff;
    padding: 0.5rem 1rem;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff, 0 0 30px #00f7ff;
}

.btn-neon:hover {
    background-color: #00f7ff;
    color: #1a202c;
    box-shadow: 0 0 20px #00f7ff, 0 0 30px #00f7ff, 0 0 40px #00f7ff;
}
