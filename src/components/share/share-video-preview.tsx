
import * as React from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShareVideoPreviewProps {
  posterSrc?: string
  className?: string
}

export function ShareVideoPreview({ posterSrc, className }: ShareVideoPreviewProps) {
  return (
    <div className={cn("relative bg-muted rounded-lg overflow-hidden border border-border", className)}>
      {posterSrc ? (
        <img src={posterSrc} alt="Video preview" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground">Không có bản xem trước</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <Button 
          className="rounded-full bg-black/40 hover:bg-black/60 h-12 w-12"
          size="icon"
          variant="ghost"
          aria-label="Play video preview"
        >
          <Play fill="white" className="ml-1 h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
