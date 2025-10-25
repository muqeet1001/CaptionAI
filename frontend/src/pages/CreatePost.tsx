import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Copy, Check } from 'lucide-react'

export default function CreatePost() {
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState<string | null>(null)
  const [captions, setCaptions] = useState<{funny: string[], serious: string[], creative: string[]}>({funny: [], serious: [], creative: []})
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [style, setStyle] = useState<string>('default')
  const [copied, setCopied] = useState<string | null>(null)
  const [showPop, setShowPop] = useState(false)

  const guestUsed = useMemo(() => Number(localStorage.getItem('guestCaptionCount') || '0'), [])
  const [guestCount, setGuestCount] = useState(guestUsed)

  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl) }, [imageUrl])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return toast.error('Select an image')
    const fd = new FormData()
    fd.append('image', file)
    try {
      setLoading(true)
      setCaption(null)
      setCaptions({funny: [], serious: [], creative: []})
      fd.append('style', style)
      if (user) {
        const res = await api.post('/post', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
        setCaption(res.data.post.caption)
        setImageUrl(res.data.post.image)
        setShowPop(true)
        setTimeout(() => setShowPop(false), 600)
        toast.success('Posted to your profile')
      } else {
        if (guestCount >= 2) {
          return toast.error('Guest limit reached. Please login to continue.')
        }
        const res = await api.post('/caption', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
        const allCaptions = res.data.caption.split('\n').filter((c: string) => c.trim())
        setCaptions({
          funny: [allCaptions[0] || '', allCaptions[1] || ''],
          serious: [allCaptions[2] || '', allCaptions[3] || ''],
          creative: [allCaptions[4] || '', allCaptions[5] || '']
        })
        setImageUrl(URL.createObjectURL(file))
        setShowPop(true)
        setTimeout(() => setShowPop(false), 600)
        const next = guestCount + 1
        setGuestCount(next)
        localStorage.setItem('guestCaptionCount', String(next))
        toast.success('Captions generated (guest)')
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.3}}>
        <Card className="border-muted/40 bg-gradient-to-br from-background to-muted/20">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-3xl tracking-tight">Create Captions</CardTitle>
                <p className="text-sm text-foreground/60 mt-1">Upload an image and let AI generate perfect captions</p>
              </div>
              {!user && <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">Guest • {2 - guestCount} left</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={submit}>
              <div className="space-y-2">
                <Label>Upload image</Label>
                <Input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files?.[0] || null)} disabled={loading} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <select value={style} onChange={(e)=> setStyle(e.target.value)} disabled={loading} className="w-full rounded-md border bg-background px-3 py-2 text-sm disabled:opacity-50">
                    <option value="default">Default</option>
                    <option value="funny">Funny</option>
                    <option value="humorous">Humorous</option>
                    <option value="informative">Informative</option>
                    <option value="poetic">Poetic</option>
                    <option value="edgy">Edgy</option>
                  </select>
              </div>
              {!user && <div className="flex items-end">
                  <p className="text-xs text-foreground/60">Guests can generate 2 captions without saving.</p>
              </div>}
              </div>
              <Button type="submit" disabled={loading || (!user && guestCount>=2)} className="w-full sm:w-auto relative overflow-hidden">
                {loading && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" animate={{x: ['-100%', '100%']}} transition={{duration: 1.5, repeat: Infinity}} />}
                <span className="relative">{loading? (user? 'Uploading...' : 'Generating...') : (user? 'Upload & Caption' : 'Generate Caption')}</span>
              </Button>
            </form>

            {/* Loading animation */}
            <AnimatePresence>
              {loading && (
                <motion.div className="mt-6 flex gap-3 justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 bg-primary rounded-full" animate={{scale: [1, 1.5, 1]}} transition={{duration: 0.6, delay: i*0.1, repeat: Infinity}} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results with pop animation */}
            <AnimatePresence>
              {(caption || (captions.funny.length > 0)) && (
                <motion.div className="mt-8 grid gap-6" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
                  {imageUrl && <motion.img src={imageUrl} alt="preview" className="rounded-lg border" initial={{scale:0.8}} animate={{scale:1}} transition={{delay:0.1}} />}
                  
                  {/* User caption */}
                  {caption && (
                    <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="p-4 rounded-lg border bg-primary/5">
                      <p className="text-sm font-semibold mb-3">Your Caption</p>
                      <p className="text-foreground/80 mb-3">{caption}</p>
                      <Button size="sm" variant="outline" onClick={() => handleCopy(caption)} className="gap-2">
                        {copied === caption ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === caption ? 'Copied!' : 'Copy'}
                      </Button>
                    </motion.div>
                  )}
                  
                  {/* Guest captions in 3 categories - List format with individual copy */}
                  {captions.funny.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(captions).map(([category, items], idx) => (
                        <motion.div key={category} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:idx*0.1}} className="space-y-3">
                          <h3 className="font-semibold text-base capitalize text-primary mb-4">{category} Captions</h3>
                          <div className="space-y-3">
                            {items.map((cap, i) => cap && (
                              <motion.div key={i} initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:idx*0.1 + i*0.05}} className="flex items-start gap-2 p-3 rounded border bg-muted/30 hover:bg-muted/50 transition-colors">
                                <span className="text-xs font-semibold text-primary/60 mt-0.5 flex-shrink-0">{i+1}.</span>
                                <p className="text-xs text-foreground/70 flex-1 leading-relaxed">{cap}</p>
                                <Button size="sm" variant="ghost" className="flex-shrink-0 text-xs gap-1 px-2" onClick={() => handleCopy(cap)}>
                                  {copied === cap ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
