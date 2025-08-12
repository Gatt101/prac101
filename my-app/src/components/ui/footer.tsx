export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Briefly</span>
          <span className="text-sm text-muted-foreground">Home for research enthusiasts</span>
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <a href="#privacy" className="hover:text-foreground">Privacy</a>
          <a href="#terms" className="hover:text-foreground">Terms</a>
        </nav>
      </div>
      <div className="mx-auto mt-6 w-full max-w-7xl px-4 text-xs text-muted-foreground/80">
        © {new Date().getFullYear()} Briefly. All rights reserved.
      </div>
    </footer>
  );
}


