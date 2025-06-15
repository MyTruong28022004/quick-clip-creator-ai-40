
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
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
    { month: "Tháng 1", views: 1860, likes: 1234, comments: 150, shares: 80 },
    { month: "Tháng 2", views: 3050, likes: 2543, comments: 340, shares: 120 },
    { month: "Tháng 3", views: 2370, likes: 1890, comments: 210, shares: 95 },
    { month: "Tháng 4", views: 730, likes: 620, comments: 80, shares: 30 },
    { month: "Tháng 5", views: 2090, likes: 1750, comments: 180, shares: 75 },
    { month: "Tháng 6", views: 2140, likes: 1980, comments: 250, shares: 110 },
];

const tableData = [
    { id: "VID001", title: "Video tuyệt vời đầu tiên của tôi", thumbnail: "https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500", views: 12043, likes: 256, comments: 48, shares: 12 },
    { id: "VID002", title: "Chuyến đi lên núi", thumbnail: "https://images.pexels.com/videos/857134/free-video-857134.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500", views: 8901, likes: 180, comments: 22, shares: 8 },
    { id: "VID003", title: "Đập hộp đồ công nghệ mới", thumbnail: "https://images.pexels.com/videos/3194248/free-video-3194248.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500", views: 25402, likes: 512, comments: 128, shares: 64 },
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

const AnalyticsTabContent = ({ platform }: { platform: string }) => {
    const [metric, setMetric] = React.useState("views");
    const [chartType, setChartType] = React.useState("bar");

    const platformColors: { [key: string]: string } = {
        YouTube: "hsl(var(--destructive))", // Red
        Facebook: "#facc15", // Yellow
        TikTok: "#22c55e", // Green
    };

    const metricLabels: { [key: string]: string } = {
        views: "Lượt xem",
        likes: "Lượt thích",
        comments: "Bình luận",
        shares: "Chia sẻ",
    };

    const chartConfig = {
        [metric]: {
            label: metricLabels[metric],
            color: platformColors[platform] || "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
    <div className="space-y-6">
        <Card>
            <CardHeader className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                    <CardTitle>Thống kê theo thời gian</CardTitle>
                    <CardDescription>
                        Tổng {metricLabels[metric].toLowerCase()} cho các video {platform} của bạn trong khoảng thời gian đã chọn.
                    </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Select value={metric} onValueChange={setMetric}>
                        <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="Chọn chỉ số" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="views">Lượt xem</SelectItem>
                            <SelectItem value="likes">Lượt thích</SelectItem>
                            <SelectItem value="comments">Bình luận</SelectItem>
                            <SelectItem value="shares">Chia sẻ</SelectItem>
                        </SelectContent>
                    </Select>
                    <RadioGroup defaultValue="bar" value={chartType} onValueChange={setChartType} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bar" id={`r1-${platform}`} />
                            <Label htmlFor={`r1-${platform}`}>Cột</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="line" id={`r2-${platform}`} />
                            <Label htmlFor={`r2-${platform}`}>Đường</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    {chartType === "bar" ? (
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
                            <Bar dataKey={metric} fill={`var(--color-${metric})`} radius={8} />
                        </BarChart>
                    ) : (
                        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                             <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <Line type="monotone" dataKey={metric} stroke={`var(--color-${metric})`} strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    )}
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
                            <TableHead className="w-[120px]">Thumbnail</TableHead>
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
                                <TableCell>
                                    <img 
                                        src={video.thumbnail} 
                                        alt={video.title} 
                                        className="w-24 aspect-video rounded-md object-cover"
                                    />
                                </TableCell>
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
}
