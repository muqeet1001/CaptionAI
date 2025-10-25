import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle modern background effect */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_50%_-100px,hsl(var(--primary)/.08),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_400px_at_80%_100%,hsl(var(--muted)/.4),transparent)]" />
      
      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-20" />
      
      {/* Wave background */}
      <div aria-hidden className="wave-background">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
      
      {/* Subtle animated elements */}
      <div aria-hidden className="stars opacity-20" />
      <div aria-hidden className="bg-beams opacity-15" />
      
      {/* Soft floating orbs */}
      <div aria-hidden className="floating-orb" style={{width:'140px', height:'140px', left:'10%', top:'22%'}} />
      <div aria-hidden className="floating-orb" style={{width:'110px', height:'110px', right:'12%', top:'34%', animationDelay:'-3s'}} />
      <div aria-hidden className="floating-orb" style={{width:'90px', height:'90px', left:'18%', bottom:'10%', animationDelay:'-6s'}} />

      <section className="container mx-auto min-h-[calc(100vh-3.5rem)] px-4 flex items-center justify-center text-center">
        <div className="relative max-w-3xl">
          {/* Arc glow behind title */}
          <div aria-hidden className="hero-arc" />

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
