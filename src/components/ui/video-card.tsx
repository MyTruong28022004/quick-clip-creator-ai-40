
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Trash2, MoreHorizontal, Share2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  thumbnail?: string
  duration?: string
  date?: string
  onPlay?: () => void
  onDelete?: () => void
  onShare?: () => void
  onAnalytics?: () => void
}

export function VideoCard({ 
  title,
  thumbnail,
  duration,
  date,
  onPlay,
  onDelete,
  onShare,
  className, 
  ...props 
}: VideoCardProps) {
  return (
    <Card 
      className={cn(
        "border border-border/40 bg-white shadow-sm overflow-hidden",
        className
      )} 
      {...props}
    >
      <div className="relative video-container bg-gray-100">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover aspect-video"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-creative-50 aspect-video">
            <span className="text-creative-300">No Preview</span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 z-10 rounded-full bg-black/30 hover:bg-black/50">
              <MoreHorizontal size={16} className="text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onShare}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        )}
        <Button 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 h-10 w-10"
          size="icon"
          variant="ghost"
          onClick={onPlay}
        >
          <Play fill="white" className="ml-0.5" />
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate mb-1 text-black dark:text-white">{title}</h3>
        {date && <p className="text-xs text-muted-foreground">{date}</p>}
      </CardContent>
    </Card>
  )
}
