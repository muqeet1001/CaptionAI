import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

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
      <Card className="border-muted/40">
        <CardHeader>
          <CardTitle className="font-display">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/70">You are not logged in.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/register"><Button variant="outline">Sign up</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-sm text-foreground/60">Your generated posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{posts.length} posts</Badge>
        </div>
      </div>

      {posts.length === 0 ? (
        <Card className="border-muted/40">
          <CardContent className="py-10 text-center text-foreground/70">No posts yet. <Link to="/create" className="text-primary underline underline-offset-4">Create one</Link>.</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Card key={p._id} className="overflow-hidden border-muted/40 flex flex-col">
              <div className="relative">
                <img src={p.image} alt="post" className="aspect-square w-full object-cover" />
                {p.style && <span className="absolute left-2 top-2 rounded bg-background/70 px-2 py-0.5 text-[10px] uppercase tracking-wider">{p.style}</span>}
              </div>
              <CardContent className="p-3 mt-auto">
                <p className="text-sm text-foreground/80 line-clamp-2 min-h-[2.5rem]">{p.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
