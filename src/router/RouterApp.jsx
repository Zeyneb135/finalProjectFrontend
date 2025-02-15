import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Wishlist from '../pages/wishlist/Wishlist'
import Hotel from '../pages/hotel/Hotel'

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/hotel" element={<Hotel/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterApp