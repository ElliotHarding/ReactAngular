import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
 
  var allProducts = ["Alpha", "Bravo", "Omega"];
  var [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  
  //Retrieve data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

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

    fetchData();
  }, []);
  
  //Delete data
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/Products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the product list after successful deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError(err);
    }
  };
  
  //Add product
  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/Products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProductName,
          price: parseFloat(newProductPrice),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setNewProductName('');
      setNewProductPrice(''); //clear form.
    } catch (err) {
      setError(err);
    }
  };
  
  if(error)
  {
  	return <h1>{error.message}</h1>;
  }
  
  console.log('Products state:', products);
  
  var theHelloWorld = "hello-world!"
  return (
    <div className="App">
      <h1>{theHelloWorld}</h1>  
       
      <h1>All Product Items</h1>
      <ul>
        {allProducts.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>   
      
      
      <h1>Products</h1>
      
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      
      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product.id)}>X</button>
          </li>
        ))}
      </ul>
     
      <h1>Items</h1>
      <ul>
		  {items.map((item, index) => (
		    <li key={index}>{item}</li>
		  ))}
    	</ul>
    </div>
  );
}

export default App;



/*
{Array.isArray(products)} =>
      (
       {products}
      )
      <ul>
        {products && Array.isArray(products) && products.map((product) => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
      </ul> 
      
      <ul>
        {products && Array.isArray(products) && products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

*/
