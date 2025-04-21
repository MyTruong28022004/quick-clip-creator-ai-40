
import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Plus, Search, Settings, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-creative-700 bg-black/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-black tracking-wide text-creative-500 uppercase font-sans">QUICKCLIP</span>
            <span className="ml-1 text-sm font-semibold tracking-wide uppercase font-sans text-white/70">CREATOR</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase font-sans hover:text-creative-500 transition-colors">
              <Home className="w-5 h-5 text-creative-500" /> HOME
            </Link>
            <Link to="/create" className="flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase font-sans hover:text-creative-500 transition-colors">
              <Plus className="w-5 h-5 text-creative-500" /> CREATE
            </Link>
            <Link to="/library" className="flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase font-sans hover:text-creative-500 transition-colors">
              <User className="w-5 h-5 text-creative-500" /> MY VIDEOS
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-creative-700">
            <Search className="h-5 w-5 text-creative-500" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-creative-700">
            <Settings className="h-5 w-5 text-creative-500" />
          </Button>
          <Button asChild variant="default" size="sm" className="gap-1 hidden sm:flex bg-creative-500 hover:bg-creative-700 text-white font-extrabold uppercase tracking-wider font-sans">
            <Link to="/create">
              <Plus className="h-4 w-4 mr-1" /> NEW VIDEO
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-creative-700">
                <User className="h-5 w-5 text-creative-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border border-creative-800">
              <DropdownMenuLabel className="font-bold text-creative-500 uppercase">MY ACCOUNT</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="uppercase font-semibold text-white/90">Profile</DropdownMenuItem>
              <DropdownMenuItem className="uppercase font-semibold text-white/90">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="uppercase font-bold text-creative-500">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

