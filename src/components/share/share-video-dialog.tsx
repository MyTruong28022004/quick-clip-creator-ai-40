
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { VideoPreview } from "@/components/content/video-preview"
import { Facebook, Youtube, Music } from "lucide-react"
import { toast } from "sonner"

interface ShareVideoDialogProps {
  video: {
    id: string;
    title: string
    thumbnail?: string
  }
  connections: {
    facebook: boolean
    youtube: boolean
    tiktok: boolean
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmShare: (videoId: string, platforms: { facebook: boolean; youtube: boolean; tiktok: boolean; }) => void;
}

export function ShareVideoDialog({ video, connections, open, onOpenChange, onConfirmShare }: ShareVideoDialogProps) {
  const [title, setTitle] = React.useState(video.title)
  const [description, setDescription] = React.useState("")
  const [platforms, setPlatforms] = React.useState({
    facebook: connections.facebook,
    youtube: connections.youtube,
    tiktok: connections.tiktok,
  })

  React.useEffect(() => {
    setTitle(video.title);
    setDescription("");
    setPlatforms({
        facebook: connections.facebook,
        youtube: connections.youtube,
        tiktok: connections.tiktok,
    })
  }, [video, connections])

  const handlePlatformChange = (platform: keyof typeof platforms, checked: boolean) => {
    setPlatforms((prev) => ({ ...prev, [platform]: checked }))
  }

  const handleQuickShare = () => {
    onConfirmShare(video.id, platforms)
  }

  const handleAutoCaption = () => {
    console.log("Generating auto captions...")
    setDescription("Đây là mô tả được tạo tự động cho video.")
    toast.info("Đã tạo phụ đề tự động.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Chia sẻ Video</DialogTitle>
          <DialogDescription>
            Chỉnh sửa chi tiết và chọn nền tảng để chia sẻ video của bạn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <VideoPreview posterSrc={video.thumbnail} />
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Thêm mô tả cho video của bạn..." />
            </div>
          </div>
          <div className="space-y-6 flex flex-col justify-between">
            <div>
              <Label className="font-semibold">Chọn nền tảng</Label>
              <div className="space-y-3 mt-2">
                {connections.facebook && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="facebook" checked={platforms.facebook} onCheckedChange={(checked) => handlePlatformChange("facebook", !!checked)} />
                    <Label htmlFor="facebook" className="flex items-center gap-2 cursor-pointer"><Facebook className="h-5 w-5 text-blue-600" /> Facebook</Label>
                  </div>
                )}
                {connections.youtube && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="youtube" checked={platforms.youtube} onCheckedChange={(checked) => handlePlatformChange("youtube", !!checked)} />
                    <Label htmlFor="youtube" className="flex items-center gap-2 cursor-pointer"><Youtube className="h-5 w-5 text-red-600" /> YouTube</Label>
                  </div>
                )}
                {connections.tiktok && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tiktok" checked={platforms.tiktok} onCheckedChange={(checked) => handlePlatformChange("tiktok", !!checked)} />
                    <Label htmlFor="tiktok" className="flex items-center gap-2 cursor-pointer"><Music className="h-5 w-5" /> TikTok</Label>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleAutoCaption}>Tạo phụ đề tự động</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Hủy</Button>
          </DialogClose>
          <Button onClick={handleQuickShare}>Chia sẻ ngay</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
