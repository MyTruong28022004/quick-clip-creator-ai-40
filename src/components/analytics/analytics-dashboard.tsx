
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"

const chartData = [
    { month: "Tháng 1", views: 1860 },
    { month: "Tháng 2", views: 3050 },
    { month: "Tháng 3", views: 2370 },
    { month: "Tháng 4", views: 730 },
    { month: "Tháng 5", views: 2090 },
    { month: "Tháng 6", views: 2140 },
];

const chartConfig = {
    views: {
        label: "Lượt xem",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const tableData = [
    { id: "VID001", title: "Video tuyệt vời đầu tiên của tôi", views: 12043, likes: 256, comments: 48, shares: 12 },
    { id: "VID002", title: "Chuyến đi lên núi", views: 8901, likes: 180, comments: 22, shares: 8 },
    { id: "VID003", title: "Đập hộp đồ công nghệ mới", views: 25402, likes: 512, comments: 128, shares: 64 },
]

export function AnalyticsDashboard() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2025, 0, 1),
        to: new Date(),
    })

  return (
    <Tabs defaultValue="youtube">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <TabsList>
                <TabsTrigger value="youtube">YouTube</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full sm:w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Chọn khoảng thời gian</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
                <Button size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Làm mới</Button>
            </div>
        </div>

        <TabsContent value="youtube">
            <AnalyticsTabContent platform="YouTube" />
        </TabsContent>
        <TabsContent value="facebook">
            <AnalyticsTabContent platform="Facebook" />
        </TabsContent>
        <TabsContent value="tiktok">
            <AnalyticsTabContent platform="TikTok" />
        </TabsContent>
    </Tabs>
  )
}

const AnalyticsTabContent = ({ platform }: { platform: string }) => (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Lượt xem theo thời gian</CardTitle>
                <CardDescription>
                    Tổng lượt xem cho các video {platform} của bạn trong khoảng thời gian đã chọn.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="views" fill="var(--color-views)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Hiệu suất Video</CardTitle>
                <CardDescription>
                    Thống kê chi tiết cho từng video trên {platform}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tiêu đề Video</TableHead>
                            <TableHead className="text-right">Lượt xem</TableHead>
                            <TableHead className="text-right">Thích</TableHead>
                            <TableHead className="text-right">Bình luận</TableHead>
                            <TableHead className="text-right">Chia sẻ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map(video => (
                            <TableRow key={video.id}>
                                <TableCell className="font-medium">{video.title}</TableCell>
                                <TableCell className="text-right">{video.views.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{video.likes.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{video.comments.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{video.shares.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
);
