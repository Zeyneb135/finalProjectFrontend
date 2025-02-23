import React from 'react'
import style from './layout.module.scss'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    <div className={style.layout}>
      <Navbar/>  
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout