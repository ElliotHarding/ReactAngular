import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch('https://localhost:3000/Products') // Replace <port> with your API port
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <ul>
		  {items.map((item, index) => (
		    <li key={index}>{item}</li>
		  ))}
    	</ul>
    </div>
  );
}

export default App;
