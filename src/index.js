import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCyjVMJLYTnilUQnA0qsZlvlYrG0QZnuHM",
  authDomain: "pou-insights.firebaseapp.com",
  projectId: "pou-insights",
  storageBucket: "pou-insights.appspot.com",
  messagingSenderId: "1060486106832",
  appId: "1:1060486106832:web:7409e69e7ffc16a209d8d5"
};


const app = initializeApp(firebaseConfig);

export default app; // Export the initialized app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

