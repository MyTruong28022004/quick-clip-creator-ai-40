
import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Header } from "@/components/navigation/header"
import { StepIndicator } from "@/components/ui/step-indicator"
import { TopicSelection } from "@/components/create/TopicSelection"
import { ScriptCreation } from "@/components/create/ScriptCreation"
import { VoiceCustomization } from "@/components/create/VoiceCustomization"
import { VideoResult } from "@/components/create/VideoResult"

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
    setCurrentStep(2)
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
            <TopicSelection 
              topic={topic}
              setTopic={setTopic}
              selectedKeywords={selectedKeywords}
              handleKeywordSelect={handleKeywordSelect}
              handleGenerateScript={handleGenerateScript}
            />
          )}
          
          {currentStep === 2 && (
            <ScriptCreation 
              script={script}
              handleBack={handleBack}
              handleSaveScript={handleSaveScript}
            />
          )}
          
          {currentStep === 3 && (
            <VoiceCustomization 
              selectedVoice={selectedVoice}
              handleBack={handleBack}
              handleSelectVoice={handleSelectVoice}
              handleCreateVideo={handleCreateVideo}
            />
          )}
          
          {currentStep === 4 && (
            <VideoResult
              downloadProgress={downloadProgress}
              handleBack={handleBack}
              handleDownload={handleDownload}
            />
          )}
        </div>
      </main>
    </div>
  )
}
