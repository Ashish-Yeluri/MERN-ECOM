import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/layouts/Header'
import Footer from './Components/layouts/Footer'
import Home from './Components/Home'
import { Toaster } from 'react-hot-toast'

import './App.css'
import ProductDetails from './Components/product/ProductDetails'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'

let App = () => {
  return (
    <div className='app'>
      <Router>
        <Toaster position='top center' />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App