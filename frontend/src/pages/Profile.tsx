import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    api.get('/profile')
      .then(res => {
        setUser(res.data.user)
        return api.get('/posts/me')
      })
      .then(res => setPosts(res.data.posts))
      .catch(() => setUser(null))
  }, [])

  if (!user) return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
        <Card className="border-muted/40 bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="font-display text-3xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 mb-2">You are not logged in.</p>
            <p className="text-sm text-foreground/50 mb-6">Sign in to save your captions and build your portfolio</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/login"><Button size="lg">Login</Button></Link>
              <Link to="/register"><Button size="lg" variant="outline">Sign up</Button></Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  return (
    <motion.div className="container mx-auto max-w-5xl px-4 py-10" initial={{opacity:0}} animate={{opacity:1}}>
      {/* Header */}
      <motion.div className="mb-8" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-4xl font-bold font-display tracking-tight">{user.username}</h2>
          <Badge className="text-base px-4 py-2 bg-primary/10 text-primary border-primary/20">{posts.length} posts</Badge>
        </div>
        <p className="text-foreground/60">Your AI-generated captions collection</p>
      </motion.div>

      {posts.length === 0 ? (
        <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}}>
          <Card className="border-muted/40 bg-gradient-to-br from-background to-muted/20 py-16 text-center">
            <CardContent>
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/40" />
              <p className="text-foreground/70 mb-4 text-lg">No posts yet</p>
              <Link to="/create"><Button size="lg" className="gap-2"><Sparkles className="w-4 h-4" />Create your first caption</Button></Link>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" initial={{opacity:0}} animate={{opacity:1}} transition={{staggerChildren: 0.1}}>
          {posts.map((p, idx) => (
            <motion.div key={p._id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: idx*0.05}}>
              <Card className="overflow-hidden border-muted/40 hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:shadow-lg">
                <div className="relative overflow-hidden bg-muted aspect-square">
                  <motion.img src={p.image} alt="post" className="aspect-square w-full object-cover" whileHover={{scale:1.05}} transition={{duration:0.3}} />
                  {p.style && <motion.span initial={{opacity:0}} animate={{opacity:1}} className="absolute left-2 top-2 rounded-full bg-primary/80 px-3 py-1 text-[10px] uppercase tracking-wider text-white font-semibold">{p.style}</motion.span>}
                </div>
                <CardContent className="p-4 mt-auto">
                  <p className="text-sm text-foreground/80 line-clamp-3 min-h-[3rem] leading-relaxed">{p.caption}</p>
                  <p className="text-xs text-foreground/40 mt-2">Generated {new Date(p.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
