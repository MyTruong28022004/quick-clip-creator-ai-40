
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, type LucideIcon } from "lucide-react";

interface PlatformConnectCardProps {
  platformName: string;
  Icon: LucideIcon;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  iconColorClassName: string;
}

export function PlatformConnectCard({ platformName, Icon, isConnected, onConnect, onDisconnect, iconColorClassName }: PlatformConnectCardProps) {
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
        <div className="text-xs text-muted-foreground mb-4">
          {isConnected ? `Đã kết nối với ${platformName}.` : `Chưa kết nối.`}
        </div>
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
