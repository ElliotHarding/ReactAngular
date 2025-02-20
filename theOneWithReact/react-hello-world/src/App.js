import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
 
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:3000/Products') // Replace with your API port
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setApiMessage(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setApiMessage("No Message");
      });
  }, []);    
  
  if(error)
  {
  	return <h1>{error.message}</h1>;
  }
  
  var theHelloWorld = "hello-world!"
  return (
    <div className="App">
      <h1>{theHelloWorld}</h1>  
       
      <h1>API MESSAGE: {apiMessage}</h1>    
     
      <ul>
		  {items.map((item, index) => (
		    <li key={index}>{item}</li>
		  ))}
    	</ul>
    </div>
  );
}

export default App;
