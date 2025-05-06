
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoPreview } from "@/components/content/video-preview"
import { ArrowLeft, Plus, Type, Music } from "lucide-react"

interface VideoResultProps {
  downloadProgress: number;
  handleBack: () => void;
  handleDownload: () => void;
}

export function VideoResult({
  downloadProgress,
  handleBack,
  handleDownload
}: VideoResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Video is Ready!</CardTitle>
        <CardDescription>
          Preview and download your AI-generated short video
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VideoPreview
          onDownload={handleDownload}
          onEdit={handleBack}
        />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Customize</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Plus size={16} /> Add Icons
              </h4>
              <div className="flex gap-3">
                {['💡', '🚀', '🌟', '💯', '🔥'].map(icon => (
                  <button key={icon} className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Type size={16} /> Font Style
              </h4>
              <div className="flex gap-3">
                <button className="px-4 py-2 border rounded hover:bg-gray-100 font-sans">Sans</button>
                <button className="px-4 py-2 border rounded hover:bg-gray-100 font-serif">Serif</button>
                <button className="px-4 py-2 border rounded hover:bg-gray-100 font-mono">Mono</button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Music size={16} /> Music Background
              </h4>
              <div className="flex flex-col gap-2">
                <button className="flex justify-between w-full px-4 py-2 border rounded hover:bg-gray-100">
                  <span>Upbeat Pop</span>
                  <span>▶️</span>
                </button>
                <button className="flex justify-between w-full px-4 py-2 border rounded hover:bg-gray-100">
                  <span>Ambient</span>
                  <span>▶️</span>
                </button>
                <button className="flex justify-between w-full px-4 py-2 border rounded hover:bg-gray-100">
                  <span>Motivational</span>
                  <span>▶️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {downloadProgress > 0 && downloadProgress < 100 && (
          <div className="mt-6">
            <div className="text-sm mb-1 flex justify-between">
              <span>Saving your video...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-creative-500 transition-all duration-300 ease-out"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleDownload} disabled={downloadProgress > 0 && downloadProgress < 100}>
          {downloadProgress > 0 && downloadProgress < 100 ? `Saving ${downloadProgress}%` : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}
