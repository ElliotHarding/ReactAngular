import React, { useState, useEffect } from 'react';

import './Products.css';

function ProductList() {
  
  var [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      console.log("Running fetch data");

      try {
        const response = await fetch('http://localhost:5000/api/Products');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API data:", data); // added console log
        setProducts(data);
        console.log("Products state:", products); //added console log
        console.log("Is array:", Array.isArray(products)); //added console log

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    //Delete data
  	const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/Products/${id}`, {
        method: 'DELETE',
      });	

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log("Legnth of products: " + products.length)
      console.log("Products: ")
      console.log(products)
      
      // Update the product list after successful deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));  
    } catch (err) {
      setError(err);
    }
  };
  
   useEffect(() => {
		fetchData();
   }, []);

  return (
  	<div className="ProductList">
  	<h2>Products (Dotnet)</h2>
  	<ul>
        {products && products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <a>   </a>
            <button onClick={() => handleDelete(product.id)}>X</button>
          </li>
        ))}
      </ul>
  	</div>
  );
}

export default ProductList;
