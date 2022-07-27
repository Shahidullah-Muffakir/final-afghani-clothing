import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './components/context/user.context';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CategoriesProvider } from './components/context/categories.context';
import { CartProvider } from './components/context/cart.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*now we have access to the all values of userContext with the of userProvider  */}
      <UserProvider>
        {/* now we have access to values of productContext with help of its provider */}
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
