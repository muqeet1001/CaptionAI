import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import CreatePost from '@/pages/CreatePost'
import NotFound from '@/pages/NotFound'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.2}}>
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Left border */}
      <div className="fixed left-0 top-0 w-0.5 h-screen bg-border z-50 pointer-events-none" />
      {/* Right border */}
      <div className="fixed right-0 top-0 w-0.5 h-screen bg-border z-50 pointer-events-none" />
      
      <Navbar />
      <main className="px-4 flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
            <Route path="/profile" element={<ProtectedRoute><AnimatedPage><Profile /></AnimatedPage></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><AnimatedPage><CreatePost /></AnimatedPage></ProtectedRoute>} />
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
