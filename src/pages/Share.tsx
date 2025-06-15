
import * as React from "react";
import { Header } from "@/components/navigation/header";
import { PlatformConnectCard } from "@/components/share/platform-connect-card";
import { Youtube, Facebook, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/ui/video-card";
import { ShareVideoDialog } from "@/components/share/share-video-dialog";
import { toast } from "sonner";

const mockVideos = [
  { id: 'vid1', title: 'Video tuyệt vời đầu tiên của tôi', thumbnail: 'https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '10 thg 6, 2025', duration: '0:45' },
  { id: 'vid2', title: 'Chuyến đi lên núi', thumbnail: 'https://images.pexels.com/videos/857134/free-video-857134.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '12 thg 6, 2025', duration: '1:12' },
  { id: 'vid3', title: 'Đập hộp đồ công nghệ mới', thumbnail: 'https://images.pexels.com/videos/3194248/free-video-3194248.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '14 thg 6, 2025', duration: '2:30' },
  { id: 'vid4', title: 'Hướng dẫn nấu ăn nhanh', thumbnail: 'https://images.pexels.com/videos/3042790/free-video-3042790.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500', date: '15 thg 6, 2025', duration: '0:59' },
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

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<(typeof mockVideos)[0] | null>(null);

  const handleShareClick = (video: (typeof mockVideos)[0]) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };
  
  const handleDeleteClick = (videoId: string) => {
    toast.error(`Chức năng xóa video ${videoId} chưa được cài đặt.`);
  }

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

  const allConnected = Object.values(connections).every(status => status === true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Share Videos</h1>
          <p className="text-muted-foreground">Kết nối các tài khoản mạng xã hội của bạn để bắt đầu chia sẻ.</p>
        </div>
        
        <Card className="mb-8">
            <CardContent className="p-6">
                 <h2 className="text-lg font-semibold mb-4">Quản lý kết nối</h2>
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
            <h2 className="text-2xl font-bold mb-4">Chọn Video để chia sẻ</h2>
            {allConnected ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockVideos.map((video) => (
                      <VideoCard 
                          key={video.id}
                          title={video.title}
                          thumbnail={video.thumbnail}
                          date={video.date}
                          duration={video.duration}
                          onShare={() => handleShareClick(video)}
                          onDelete={() => handleDeleteClick(video.id)}
                      />
                  ))}
                </div>
            ) : (
                <div className="p-8 text-center border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Vui lòng kết nối tất cả các nền tảng để xem và chia sẻ video của bạn.</p>
                </div>
            )}
        </div>
      </main>
      {selectedVideo && (
        <ShareVideoDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          video={selectedVideo}
          connections={connections}
        />
      )}
    </div>
  );
}
