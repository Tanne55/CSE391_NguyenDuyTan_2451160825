import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AndDemo from '../components/AndDemo'
import Header from '../components/Header_Footer'
import Footer from '../components/Header_Footer'
import ProductCard from '../components/ProductCard'
import './App.css'

function App() {
  const products = [
    { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" },
    { id: 4, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" },
    { id: 5, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" },
    { id: 6, name: "Xiaomi 14", price: "15.000.000", image: "https://via.placeholder.com/200" }
  ];

  return (
    <>
    <Header />
    <div>
      
      <h1 style={{ textAlign: "center" }}>Cửa hàng điện thoại</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
      
    </div>
    <Footer/>
    </>
  );
}

export default App
