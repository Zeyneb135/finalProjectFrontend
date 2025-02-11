import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import FirstSection from '../../components/firstSection/FirstSection'
import SecondSection from '../../components/secondSection/SecondSection'
import ThirdSection from '../../components/thirdSection/ThirdSection'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <FirstSection/>
        <SecondSection/>
        <ThirdSection/>
    </div>
  )
}

export default Home