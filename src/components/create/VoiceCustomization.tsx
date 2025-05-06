
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VoiceSelection } from "@/components/content/voice-selection"
import { ArrowLeft, Check } from "lucide-react"

interface VoiceCustomizationProps {
  selectedVoice: number | null;
  handleBack: () => void;
  handleSelectVoice: (voiceId: number) => void;
  handleCreateVideo: () => void;
}

export function VoiceCustomization({
  selectedVoice,
  handleBack,
  handleSelectVoice,
  handleCreateVideo
}: VoiceCustomizationProps) {
  return (
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
  );
}
