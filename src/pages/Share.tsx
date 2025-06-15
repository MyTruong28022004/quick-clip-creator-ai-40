
import * as React from "react";
import { Header } from "@/components/navigation/header";
import { PlatformConnectCard } from "@/components/share/platform-connect-card";
import { Youtube, Facebook, Music } from "lucide-react";
import { LibraryGrid } from "@/components/content/library-grid";
import { Card, CardContent } from "@/components/ui/card";

export default function Share() {
  // Mock connection state
  const [connections, setConnections] = React.useState({
    facebook: true,
    youtube: true,
    tiktok: false,
  });

  const handleConnect = (platform: keyof typeof connections) => {
    // In a real app, this would trigger the OAuth flow
    console.log(`Connecting to ${platform}...`);
    // This is where you would call the backend to initiate OAuth
    setConnections(prev => ({ ...prev, [platform]: true }));
  };
  
  const handleDisconnect = (platform: keyof typeof connections) => {
    console.log(`Disconnecting from ${platform}...`);
    setConnections(prev => ({ ...prev, [platform]: false }));
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
                    />
                    <PlatformConnectCard
                        platformName="YouTube"
                        Icon={Youtube}
                        isConnected={connections.youtube}
                        onConnect={() => handleConnect("youtube")}
                        onDisconnect={() => handleDisconnect("youtube")}
                        iconColorClassName="text-red-600"
                    />
                    <PlatformConnectCard
                        platformName="TikTok"
                        Icon={Music}
                        isConnected={connections.tiktok}
                        onConnect={() => handleConnect("tiktok")}
                        onDisconnect={() => handleDisconnect("tiktok")}
                        iconColorClassName="text-black dark:text-white"
                    />
                </div>
            </CardContent>
        </Card>
        
        <div>
            <h2 className="text-2xl font-bold mb-4">Chọn Video để chia sẻ</h2>
            {allConnected ? (
                <LibraryGrid />
            ) : (
                <div className="p-8 text-center border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Vui lòng kết nối tất cả các nền tảng để xem và chia sẻ video của bạn.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
