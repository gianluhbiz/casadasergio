import Footer from '../components/Footer'
import Altri from '../sections/Altri'
import Day from '../sections/Day'
import Hero from '../sections/Hero'
import Manifesto from '../sections/Manifesto'
import Reviews from '../sections/Reviews'
import Sogno from '../sections/Sogno'
import Visit from '../sections/Visit'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Day />
        <Manifesto />
        <Reviews />
        <Altri />
        <Sogno />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
