
import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { StepIndicator } from "@/components/ui/step-indicator"
import { ScriptEditor } from "@/components/content/script-editor"
import { VoiceSelection } from "@/components/content/voice-selection"
import { VideoPreview } from "@/components/content/video-preview"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Font, Music, Plus, Sparkles, X } from "lucide-react"

export default function Create() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get topic from URL if available
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlTopic = params.get('topic');
    if (urlTopic) {
      setTopic(urlTopic);
      // Optionally auto-generate script if topic is provided from URL
      setTimeout(() => {
        handleGenerateScript();
      }, 500);
    }
  }, [location.search]);
  
  const [currentStep, setCurrentStep] = React.useState(1)
  const [topic, setTopic] = React.useState("")
  const [script, setScript] = React.useState("")
  const [selectedVoice, setSelectedVoice] = React.useState<number | null>(null)
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([])
  const [downloadProgress, setDownloadProgress] = React.useState(0)
  
  const totalSteps = 4
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleGenerateScript = () => {
    console.log("Generating script for topic:", topic)
    setScript("This is an AI-generated script about " + topic + ". It includes an engaging introduction, three main points with supporting information, and a strong call-to-action conclusion.")
  }
  
  const handleCreateVideo = () => {
    console.log("Creating video...")
    // Simulate video creation delay
    setTimeout(() => {
      setCurrentStep(4)
    }, 2000)
  }
  
  const handleSaveScript = (content: string) => {
    setScript(content)
    // Auto-advance to next step
    setCurrentStep(3)
  }
  
  const handleSelectVoice = (voiceId: number) => {
    setSelectedVoice(voiceId)
  }
  
  const handleDownload = () => {
    console.log("Downloading video...")
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        navigate("/library")
      }
    }, 300);
  }
  
  const handleKeywordSelect = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword))
    } else {
      setSelectedKeywords([...selectedKeywords, keyword])
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} className="mb-8" />
          
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Choose a Topic</CardTitle>
                <CardDescription>
                  Enter a topic or keyword for your short video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Enter a topic (e.g., AI in everyday life, Sustainability tips)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "Tech", "Fashion", "Health", "Finance", "Education"].map((tag) => (
                      <Badge 
                        key={tag}
                        variant={selectedKeywords.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleKeywordSelect(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full gap-2"
                    onClick={handleGenerateScript}
                    disabled={!topic.trim() && selectedKeywords.length === 0}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Script from Topic
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Create Your Script</CardTitle>
                <CardDescription>
                  Customize the AI-generated script or write your own
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScriptEditor 
                  initialContent={script} 
                  onSave={handleSaveScript}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Voice & Customize</CardTitle>
                <CardDescription>
                  Choose a voice for your video and customize settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceSelection onSelectVoice={handleSelectVoice} />
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Background Options</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((id) => (
                      <div 
                        key={id}
                        className="aspect-video bg-creative-50 rounded-md cursor-pointer hover:ring-2 hover:ring-creative-400 transition-all"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-creative-300">BG {id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleCreateVideo} 
                  disabled={selectedVoice === null}
                >
                  Create Video <Check className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {currentStep === 4 && (
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
                        <Font size={16} /> Font Style
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
          )}
        </div>
      </main>
    </div>
  )
}
