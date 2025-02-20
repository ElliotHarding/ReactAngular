import logo from './logo.svg';
import './App.css';

import React from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];

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
