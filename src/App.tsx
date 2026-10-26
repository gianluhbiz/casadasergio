import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router'
import BookingProvider from './components/BookingSheet'
import MobileDock from './components/MobileDock'
import Nav from './components/Nav'
import TransitionProvider from './components/PageTransition'
import Home from './pages/Home'
import MenuPage from './pages/Menu'

function ScrollOnPop() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  useEffect(() => {
    if (type === 'POP') window.scrollTo(0, 0)
  }, [pathname, type])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <BookingProvider>
          <div className="grain overflow-x-clip">
            <ScrollOnPop />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <MobileDock />
          </div>
        </BookingProvider>
      </TransitionProvider>
    </MotionConfig>
  )
}
