import React from 'react'
import "./style.scss"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'

const Home = () => {
  return (
    <main className="home">
        <Navbar />
        <Header />
        <h1 className="home--title">Browse by property type</h1>
        <PropertyList/>
        <h1 className="home--title">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
    </main>
  )
}

export default Home