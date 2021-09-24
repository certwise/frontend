import React from 'react'

import Header from '../../partials/home/Header'
import HeroHome from '../../partials/home/HeroHome'
import FeaturesHome from '../../partials/home/Features'
import FeaturesBlocks from '../../partials/home/FeaturesBlocks'
import Testimonials from '../../partials/home/Testimonials'
import Newsletter from '../../partials/home/Newsletter'
import Footer from '../../partials/home/Footer'
import Context from '../../store/context'
function Home() {
  const { store, dispatch } = React.useContext(Context)
  React.useEffect(() => {
    dispatch({ type: 'IS_IN_HOME_PAGE', payload: true })
    return () => {
      dispatch({ type: 'IS_IN_HOME_PAGE', payload: false })
    }
  }, [])
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  )
}

export default Home