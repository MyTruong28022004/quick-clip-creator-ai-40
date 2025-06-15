import * as React from "react";
import { Header } from "@/components/navigation/header";
import { PlatformConnectCard } from "@/components/share/platform-connect-card";
import { Youtube, Facebook, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/ui/video-card";
import { ShareVideoDialog } from "@/components/share/share-video-dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialMockVideos = [
  { id: 'vid1', title: 'Video tuyệt vời đầu tiên của tôi', thumbnail: 'https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '10 thg 6, 2025', duration: '0:45', sharedOn: { facebook: true, youtube: false, tiktok: false } },
  { id: 'vid2', title: 'Chuyến đi lên núi', thumbnail: 'https://images.pexels.com/videos/857134/free-video-857134.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '12 thg 6, 2025', duration: '1:12', sharedOn: { facebook: true, youtube: true, tiktok: false } },
  { id: 'vid3', title: 'Đập hộp đồ công nghệ mới', thumbnail: 'https://images.pexels.com/videos/3194248/free-video-3194248.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '14 thg 6, 2025', duration: '2:30', sharedOn: { facebook: false, youtube: true, tiktok: false } },
  { id: 'vid4', title: 'Hướng dẫn nấu ăn nhanh', thumbnail: 'https://images.pexels.com/videos/3042790/free-video-3042790.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '15 thg 6, 2025', duration: '0:59', sharedOn: { facebook: false, youtube: false, tiktok: false } },
];

export default function Share() {
  const [connections, setConnections] = React.useState({
    facebook: true,
    youtube: true,
    tiktok: false,
  });
  
  const mockViews = {
    facebook: 12345,
    youtube: 67890,
    tiktok: 102345,
  }

  const [videos, setVideos] = React.useState(initialMockVideos);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<(typeof videos)[0] | null>(null);
  const [videoToDeleteId, setVideoToDeleteId] = React.useState<string | null>(null);

  const handleShareClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };
  
  const handleDeleteClick = (videoId: string) => {
    setVideoToDeleteId(videoId);
  }

  const handleConfirmDelete = () => {
    if (videoToDeleteId) {
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoToDeleteId));
      toast.success("Video đã được xóa thành công!");
      setVideoToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setVideoToDeleteId(null);
  };

  const handleConnect = (platform: keyof typeof connections) => {
    console.log(`Connecting to ${platform}...`);
    setConnections(prev => ({ ...prev, [platform]: true }));
    toast.success(`Đã kết nối với ${platform}!`);
  };
  
  const handleDisconnect = (platform: keyof typeof connections) => {
    console.log(`Disconnecting from ${platform}...`);
    setConnections(prev => ({ ...prev, [platform]: false }));
    toast.info(`Đã ngắt kết nối với ${platform}.`);
  };

  const handleConfirmShare = (videoId: string, sharedPlatforms: { [key: string]: boolean }) => {
    setVideos(prevVideos => 
      prevVideos.map(video => {
        if (video.id === videoId) {
          const newSharedOn = { ...video.sharedOn };
          for (const platform in sharedPlatforms) {
            if (sharedPlatforms[platform]) {
              newSharedOn[platform as keyof typeof newSharedOn] = true;
            }
          }
          return { ...video, sharedOn: newSharedOn };
        }
        return video;
      })
    );
    setDialogOpen(false);
    toast.success("Video đã được chia sẻ thành công!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Share Videos</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Kết nối các tài khoản mạng xã hội của bạn để bắt đầu chia sẻ.</p>
        </div>
        
        <Card className="mb-12">
            <CardContent className="p-6">
                 <h2 className="text-xl font-semibold mb-6">Quản lý kết nối</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <PlatformConnectCard
                        platformName="Facebook"
                        Icon={Facebook}
                        isConnected={connections.facebook}
                        onConnect={() => handleConnect("facebook")}
                        onDisconnect={() => handleDisconnect("facebook")}
                        iconColorClassName="text-blue-600"
                        views={mockViews.facebook}
                    />
                    <PlatformConnectCard
                        platformName="YouTube"
                        Icon={Youtube}
                        isConnected={connections.youtube}
                        onConnect={() => handleConnect("youtube")}
                        onDisconnect={() => handleDisconnect("youtube")}
                        iconColorClassName="text-red-600"
                        views={mockViews.youtube}
                    />
                    <PlatformConnectCard
                        platformName="TikTok"
                        Icon={Music}
                        isConnected={connections.tiktok}
                        onConnect={() => handleConnect("tiktok")}
                        onDisconnect={() => handleDisconnect("tiktok")}
                        iconColorClassName="text-black dark:text-white"
                        views={connections.tiktok ? mockViews.tiktok : undefined}
                    />
                </div>
            </CardContent>
        </Card>
        
        <div>
            <h2 className="text-3xl font-bold mb-6">Chọn Video để chia sẻ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                  <VideoCard 
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      date={video.date}
                      duration={video.duration}
                      onShare={() => handleShareClick(video)}
                      onDelete={() => handleDeleteClick(video.id)}
                      sharedOn={video.sharedOn}
                  />
              ))}
            </div>
        </div>
      </main>
      {selectedVideo && (
        <ShareVideoDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          video={selectedVideo}
          connections={connections}
          onConfirmShare={handleConfirmShare}
        />
      )}
      <AlertDialog open={videoToDeleteId !== null} onOpenChange={(open) => !open && setVideoToDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa video này không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn video khỏi thư viện của bạn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
