
import * as React from "react"
import { useNavigate } from "react-router-dom"
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
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"

export default function Create() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [topic, setTopic] = React.useState("")
  const [script, setScript] = React.useState("")
  const [selectedVoice, setSelectedVoice] = React.useState<number | null>(null)
  
  const totalSteps = 4
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }
  
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
  }
  
  const handleSelectVoice = (voiceId: number) => {
    setSelectedVoice(voiceId)
  }
  
  const handleDownload = () => {
    console.log("Downloading video...")
    navigate("/library")
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
                      <button 
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-creative-50 text-creative-600 hover:bg-creative-100"
                        onClick={() => setTopic(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <Button 
                    className="w-full gap-2"
                    onClick={handleGenerateScript}
                    disabled={!topic.trim()}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Script from Topic
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} disabled={!topic.trim()}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
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
                <Button onClick={handleNext} disabled={!script.trim()}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
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
                  onEdit={() => setCurrentStep(2)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Make Changes
                </Button>
                <Button onClick={handleDownload}>
                  Download & Save <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
