import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const items = ["Apple", "Banana", "Orange"];
  const [message, setMessage] = useState('');
  
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
    	
      <h2>Maths equations (Python)</h2>
    	
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
