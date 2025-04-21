
import * as React from "react"
import { VideoCard } from "@/components/ui/video-card"

// Mock video data
const videos = [
  {
    id: 1,
    title: "AI trends in 2025",
    thumbnail: "",
    duration: "0:45",
    date: "April 21, 2025"
  },
  {
    id: 2,
    title: "Sustainable living tips",
    thumbnail: "",
    duration: "0:32",
    date: "April 19, 2025"
  },
  {
    id: 3,
    title: "Mental health awareness",
    thumbnail: "",
    duration: "0:58",
    date: "April 15, 2025"
  },
  {
    id: 4,
    title: "Future of remote work",
    thumbnail: "",
    duration: "0:36",
    date: "April 10, 2025"
  },
  {
    id: 5,
    title: "Tech gadgets review",
    thumbnail: "",
    duration: "0:42",
    date: "April 5, 2025"
  },
  {
    id: 6,
    title: "Easy recipes for beginners",
    thumbnail: "",
    duration: "0:39",
    date: "April 1, 2025"
  }
]

export function LibraryGrid() {
  const handlePlay = (id: number) => {
    console.log("Playing video", id)
  }

  const handleEdit = (id: number) => {
    console.log("Editing video", id)
  }

  const handleDownload = (id: number) => {
    console.log("Downloading video", id)
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Videos</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>6 videos</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            date={video.date}
            onPlay={() => handlePlay(video.id)}
            onEdit={() => handleEdit(video.id)}
            onDownload={() => handleDownload(video.id)}
          />
        ))}
      </div>
    </div>
  )
}
