import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Languages, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { ApiKeyDialog } from "./ApiKeyDialog";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [apiKey, setApiKey] = useState<string>('');
  const { speak, isLoading, isPlaying } = useTextToSpeech({ apiKey });

  const handleLanguageChange = (newLanguage: 'en' | 'hi') => {
    setLanguage(newLanguage);
    // Speak a welcome message in the selected language
    const welcomeMessage = newLanguage === 'hi' 
      ? 'नमस्ते! एक्वागार्ड एआई में आपका स्वागत है।'
      : 'Hello! Welcome to AquaGuard AI.';
    speak(welcomeMessage, newLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <ApiKeyDialog onApiKeySet={setApiKey} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-2 bg-card/80 backdrop-blur border-border/50 hover:bg-accent/80"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'EN' : 'हि'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur border-border/50">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('en')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/80"
          >
            <span className="text-lg">🇺🇸</span>
            <span>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('hi')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/80"
          >
            <span className="text-lg">🇮🇳</span>
            <span>हिंदी</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => speak(t('hero.title'), language)}
        disabled={isLoading || isPlaying}
        className="bg-card/80 backdrop-blur border-border/50 hover:bg-accent/80"
      >
        <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
      </Button>
    </div>
  );
};