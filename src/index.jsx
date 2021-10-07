import React from 'react';
import ReactDOM from 'react-dom';
import './Admin.css';
import './App.css';
import App from './App';

if(localStorage.getItem('viewed') == undefined){
    localStorage.setItem('viewed', JSON.stringify([]))
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
