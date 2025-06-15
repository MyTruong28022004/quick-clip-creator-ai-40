
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PlatformConnectCardProps {
  platformName: string;
  Icon: LucideIcon;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  iconColorClassName: string;
  views?: number;
  userName?: string;
  userAvatar?: string;
}

export function PlatformConnectCard({ platformName, Icon, isConnected, onConnect, onDisconnect, iconColorClassName, views, userName, userAvatar }: PlatformConnectCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className={cn("h-5 w-5", iconColorClassName)} />
          {platformName}
        </CardTitle>
        {isConnected ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        {isConnected && userName && userAvatar ? (
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{userName}</p>
              {views !== undefined ? (
                 <p className="text-xs text-muted-foreground">{views.toLocaleString()} lượt xem</p>
              ) : (
                 <p className="text-xs text-muted-foreground">Đã kết nối</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {views !== undefined && (
              <div className="mb-3">
                <div className="text-2xl font-bold">{views.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Tổng lượt xem</p>
              </div>
            )}
            <div className="text-xs text-muted-foreground mb-4">
              {isConnected ? `Đã kết nối với ${platformName}.` : `Chưa kết nối.`}
            </div>
          </>
        )}
        <Button
          onClick={isConnected ? onDisconnect : onConnect}
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className="w-full"
        >
          {isConnected ? "Ngắt kết nối" : `Kết nối ${platformName}`}
        </Button>
      </CardContent>
    </Card>
  );
}
