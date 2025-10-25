import { useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function CreatePost() {
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [style, setStyle] = useState<string>('default')

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
      fd.append('style', style)
      if (user) {
        const res = await api.post('/post', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
        setCaption(res.data.post.caption)
        setImageUrl(res.data.post.image)
        toast.success('Posted to your profile')
      } else {
        if (guestCount >= 2) {
          return toast.error('Guest limit reached. Please login to continue.')
        }
        const res = await api.post('/caption', fd, { headers: { 'Content-Type': 'multipart/form-data' }})
        setCaption(res.data.caption)
        setImageUrl(URL.createObjectURL(file))
        const next = guestCount + 1
        setGuestCount(next)
        localStorage.setItem('guestCaptionCount', String(next))
        toast.success('Caption generated (guest)')
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card className="border-muted/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Create</CardTitle>
            {!user && <Badge variant="secondary">Guest mode • {2 - guestCount} left</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={submit}>
            <div className="space-y-2">
              <Label>Upload image</Label>
              <Input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files?.[0] || null)} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Style</Label>
                <select value={style} onChange={(e)=> setStyle(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="default">Default</option>
                  <option value="funny">Funny</option>
                  <option value="humorous">Humorous</option>
                  <option value="informative">Informative</option>
                  <option value="poetic">Poetic</option>
                  <option value="edgy">Edgy</option>
                </select>
              </div>
              <div className="flex items-end">
                <p className="text-xs text-foreground/60">{user ? 'Saved to your profile and costs 10 points.' : 'Guests can generate 2 captions without saving.'}</p>
              </div>
            </div>
            <Button type="submit" disabled={loading || (!user && guestCount>=2)} className="w-full sm:w-auto">{loading? (user? 'Uploading...' : 'Generating...') : (user? 'Upload & Caption' : 'Generate Caption')}</Button>
          </form>

          {caption && (
            <div className="mt-6 grid gap-3">
              {imageUrl && <img src={imageUrl} alt="preview" className="rounded-lg border" />}
              <div className="text-sm text-foreground/80">{caption}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
