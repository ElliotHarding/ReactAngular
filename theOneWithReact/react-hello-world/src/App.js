import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
  
  var theHelloWorld = "Hello World!"
  return (
    <div className="App">
      <h1>{theHelloWorld}</h1>  
           
      <h2>Items (React)</h2>
      <ul>
		  {items.map((item, index) => (
		    <li key={index}>{item}</li>
		  ))}
    	</ul>
    	
    </div>
  );
}

export default App;
