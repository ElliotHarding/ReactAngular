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
  
  /*useEffect(() => {
    fetch('http://localhost:5000/api/Products') // Replace with your API port
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);   */
  
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
      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
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
