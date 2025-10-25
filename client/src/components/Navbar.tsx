import { Link, NavLink } from 'react-router-dom'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export function Navbar() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <header className="w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight">CaptionAI</Link>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavLink to="/" className={({isActive})=>`px-3 py-2 text-sm tracking-wide uppercase ${isActive? 'text-primary' : 'text-foreground/70'}`}>Home</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/create" className={({isActive})=>`px-3 py-2 text-sm tracking-wide uppercase ${isActive? 'text-primary' : 'text-foreground/70'}`}>Create</NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/profile" className={({isActive})=>`px-3 py-2 text-sm tracking-wide uppercase ${isActive? 'text-primary' : 'text-foreground/70'}`}>Profile</NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link to="/profile"><Button size="sm" variant="outline">{user.username}</Button></Link>
          ) : (
            <>
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Sign up</Button></Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm" aria-label="Menu" onClick={()=> setOpen(v=>!v)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
            <NavLink to="/" onClick={()=> setOpen(false)} className={({isActive})=>`block rounded-md px-3 py-2 text-sm ${isActive? 'bg-primary/10 text-primary' : 'text-foreground/80'}`}>Home</NavLink>
            <NavLink to="/create" onClick={()=> setOpen(false)} className={({isActive})=>`block rounded-md px-3 py-2 text-sm ${isActive? 'bg-primary/10 text-primary' : 'text-foreground/80'}`}>Create</NavLink>
            <NavLink to="/profile" onClick={()=> setOpen(false)} className={({isActive})=>`block rounded-md px-3 py-2 text-sm ${isActive? 'bg-primary/10 text-primary' : 'text-foreground/80'}`}>Profile</NavLink>
            <div className="flex items-center gap-2 pt-2">
              <ThemeToggle />
              {user ? (
                <Link to="/profile" onClick={()=> setOpen(false)}><Button size="sm" variant="outline" className="w-full">{user.username}</Button></Link>
              ) : (
                <>
                  <Link to="/login" onClick={()=> setOpen(false)}><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
                  <Link to="/register" onClick={()=> setOpen(false)}><Button size="sm" className="w-full">Sign up</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
