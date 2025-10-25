export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} CaptionAI</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground/80">Privacy</a>
          <a href="#" className="hover:text-foreground/80">Terms</a>
          <a href="#" className="hover:text-foreground/80">Contact</a>
        </div>
      </div>
    </footer>
  )
}