import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
  
  /*
  useEffect(() => {
    fetch('https://localhost:3000/Products') // Replace <port> with your API port
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);*/
  
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:3000/Products') // Replace with your API port
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
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <p>{apiMessage}</p>
      <p>{apiMessage}</p>
      <p>{apiMessage}</p>
      <p>{apiMessage}</p>
      <ul>
		  {items.map((item, index) => (
		    <li key={index}>{item}</li>
		  ))}
    	</ul>
    </div>
  );
}

export default App;
