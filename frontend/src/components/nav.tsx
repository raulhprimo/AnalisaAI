import Link from "next/link"
import { Button } from "@/components/button"
import { ThemeToggle } from "@/components/theme-toggle"


export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          AnalisaAI
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/upload">Upload</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/visualizacao">Visualização</Link>


          </Button>
          <Button variant="ghost" asChild>
            <Link href="/analise">Análise</Link>
          </Button>
          <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800" />
          <ThemeToggle />

        </div>
      </div>
    </nav>
  )
} 