
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Wall from './components/Wall';

function App() {
  const [message, setMessage] = useState('');

  const refreshPost = () => {
    getJSON();
  }

  const getJSON = () => {
    fetch('http://localhost:8000/api/wall/', {
      method: 'GET'
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        setMessage(data);

      }
      )
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getJSON();
  }, [])

  return (
    <div className='App'>
      <Login refreshPost={refreshPost} />
      <Wall message={message} />
    </div>
  );
}

export default App;
