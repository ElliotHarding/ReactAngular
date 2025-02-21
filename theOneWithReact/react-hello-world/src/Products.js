import React, { useState, useEffect } from 'react';

import './Products.css';

function ProductList() {
  
  var [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  
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
    
    
    //Send to python for graph analysis
    //
    const [histogramImage, setHistogramImage] = useState(null);
	const [data, setData] = useState({
		A: 10,
		B: 15,
		C: 20,
		D: 10,
		E: 25,
	  });
    //const [processedResult, setProcessedResult] = useState(null);
   	//products
    //Send to python
	const handleProcessData = async () => {
		try {
		
		  const response = await fetch('http://localhost:8000/api/createProductDataHistogram', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ input: products }),
		  });
		  
		   if (response.ok) {
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);
                setHistogramImage(imageUrl);
            } else {
                console.error('Error fetching histogram:', response.status);
            }
		  
		  //const data = await response.json();
		  //setProcessedResult(data);
		} catch (error) {
		  console.error('Error processing data:', error);
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

  return (
  	<div className="ProductList">
  	
	  	<h2>Products (Dotnet) <button onClick={() => fetchData()}>Fetch Data!</button>
	  	</h2>
	  	
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
		        <a>   </a>
		        <button onClick={() => handleDelete(product.id)}>X</button>
		      </li>
		    ))}
      	</ul>     	
        <button onClick={() => handleProcessData()}>Display data!</button>
        {histogramImage && <img src={histogramImage} alt="Histogram" />}
  	</div>
  );
}

export default ProductList;
