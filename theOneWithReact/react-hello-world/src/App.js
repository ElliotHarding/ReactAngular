import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
  
  var [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  
  
  /*  
   const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:5000/api/Products'); // Assuming your route is api/Products

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
   const handleRefresh = () => {
    getProducts();
  	};*/
  
  //Retrieve data
  useEffect(() => {
    
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
      
      console.log("Legnth of products: " + products.length)
      console.log("Products: ")
      console.log(products)
      
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
  
  
  
  //Python vars
  const [apiData, setApiData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [processedResult, setProcessedResult] = useState(null);
  
  //Get from python
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  //Send to python
  const handleProcessData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/process_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData }),
      });
      const data = await response.json();
      setProcessedResult(data);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };
  
  
  
  if(error)
  {
  	return <h1>{error.message}</h1>;
  }
  
  console.log('Products state:', products);
  
  //<button onClick={handleRefresh}>Refresh Data</button>
  
  var theHelloWorld = "hello-world!"
  return (
    <div className="App">
      <h1>{theHelloWorld}</h1>  
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
    	
      <h1></h1>
      <h1></h1>
      <h1>Python sending data</h1>
    	
      {apiData && <p>{apiData.message}</p>}
	  <div>
	    <input
	      type="text"
	      value={inputData}
	      onChange={(e) => setInputData(e.target.value)}
	    />
	    <button onClick={handleProcessData}>Process Data</button>
	    {processedResult && <p>Processed: {JSON.stringify(processedResult)}</p>}
	  </div>
    	
    </div>
  );
}

export default App;
