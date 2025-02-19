import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products') // Your .NET API URL
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
  	<div className="ProductList">
  	<h1>
  		hello world
  	</h1>
  	</div>
//    <ul>
//      {products.map(product => (
//        <li key={product}>{product}</li>
//      ))}
//    </ul>
  );
}

export default ProductList;
