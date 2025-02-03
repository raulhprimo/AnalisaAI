import Link from "next/link"
import { Button } from "@/components/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { TrendingUp } from "lucide-react"

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <div className="flex">
            <span className="text-neutral-900 dark:text-white">ANALIS</span><span className="text-purple-600 dark:text-purple-400">AI</span>
          </div>
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