import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-grid">
      {/* Starfield + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_50%_-100px,theme(colors.primary.DEFAULT/.25),transparent)]" />
      <div aria-hidden className="stars" />
      <div aria-hidden className="bg-beams" />
      {/* Floating orbs */}
      <div aria-hidden className="floating-orb" style={{width:'140px', height:'140px', left:'10%', top:'22%'}} />
      <div aria-hidden className="floating-orb" style={{width:'110px', height:'110px', right:'12%', top:'34%', animationDelay:'-3s'}} />
      <div aria-hidden className="floating-orb" style={{width:'90px', height:'90px', left:'18%', bottom:'10%', animationDelay:'-6s'}} />

      <section className="container mx-auto min-h-[calc(100vh-3.5rem)] px-4 flex items-center justify-center text-center">
        <div className="relative max-w-3xl">
          {/* Arc glow behind title */}
          <div aria-hidden className="hero-arc" />

          <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase text-foreground/70 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <span>Next‑Gen AI Engine</span>
          </motion.div>

          <motion.h1 initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.05, duration:0.5}} className="mt-5 font-display text-5xl md:text-6xl leading-tight">
            The <span className="text-gradient">intelligence</span>
            <br />
            behind every caption.
          </motion.h1>

          <motion.p initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.1, duration:0.5}} className="mt-5 text-base md:text-lg text-foreground/70">
            CaptionAI learns, adapts, and crafts precise, on‑brand captions in real‑time to amplify engagement.
          </motion.p>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/create"><Button size="lg">Start Creating</Button></Link>
            <Link to="/profile"><Button size="lg" variant="outline">View Profile</Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
