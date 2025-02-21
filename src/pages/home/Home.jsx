import React from 'react'
import Header from '../../components/header/Header'
import FirstSection from '../../components/firstSection/FirstSection'
import SecondSection from '../../components/secondSection/SecondSection'
import ThirdSection from '../../components/thirdSection/ThirdSection'
import Layout from '../../components/layout/Layout'

const Home = () => {
  return (
    <Layout>
        <Header/>
        <FirstSection/>
        <SecondSection/>
        <ThirdSection/>
    </Layout>
  )
}

export default Home