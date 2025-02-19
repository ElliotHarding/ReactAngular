import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://http://localhost:8081/api/products') // Your API URL
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

export default ProductList;
