import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground mt-2">The page you’re looking for doesn’t exist.</p>
      <Link to="/"><Button className="mt-6">Go home</Button></Link>
    </div>
  )
}