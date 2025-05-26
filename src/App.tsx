import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import About from './pages/About';
import NewArrivalsPage from './pages/NewArrivalsPage';
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  return (
    <CartProvider>
      <LoadingScreen />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;