import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export const VoiceAssistant = () => {
  const { language, t } = useLanguage();
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSpeak = () => {
    if (text.trim()) {
      speak(text, language);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>{t('common.speak')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder={language === 'hi' ? 'यहाँ टेक्स्ट लिखें...' : 'Type text here...'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-background/50 border-border/50"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "outline"}
            size="sm"
            className="flex-1"
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'रोकें' : 'Stop'}
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'सुनें' : 'Listen'}
              </>
            )}
          </Button>
          
          <Button
            onClick={isPlaying ? stop : handleSpeak}
            variant={isPlaying ? "destructive" : "default"}
            size="sm"
            disabled={isLoading || !text.trim()}
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <VolumeX className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'रोकें' : 'Stop'}
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                {isLoading ? (language === 'hi' ? 'लोड...' : 'Loading...') : (language === 'hi' ? 'बोलें' : 'Speak')}
              </>
            )}
          </Button>
        </div>
        
        {isListening && (
          <div className="text-center text-sm text-muted-foreground animate-pulse">
            {language === 'hi' ? 'सुन रहा है...' : 'Listening...'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};