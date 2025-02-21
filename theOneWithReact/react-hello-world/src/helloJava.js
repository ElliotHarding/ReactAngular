import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function HelloJava() {

  const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
		    try {
		        const response = await fetch('http://localhost:8080/api/hello');
		        const data = await response.text(); // Spring boot returns plain text.
		        setMessage(data);
		    } catch (error) {
		        console.error('Error fetching data:', error);
		    }
		};

		fetchData();
	}, []);
    
  return (
    <div className="HelloJava">
      <div>
            <h1>Spring Boot Integration</h1>
            <p>{message}</p>
        </div>
    </div>
  );
}

export default HelloJava;
