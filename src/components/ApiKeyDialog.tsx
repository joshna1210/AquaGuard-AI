import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ApiKeyDialogProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyDialog = ({ onApiKeySet }: ApiKeyDialogProps) => {
  const { language, t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Key className="h-4 w-4" />
          <span>{language === 'hi' ? 'AI आवाज सेट करें' : 'Setup AI Voice'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>{language === 'hi' ? 'ElevenLabs API Key' : 'ElevenLabs API Key'}</span>
          </DialogTitle>
          <DialogDescription>
            {language === 'hi' 
              ? 'उच्च गुणवत्ता वाली AI आवाज के लिए अपनी ElevenLabs API key दर्ज करें। यह वैकल्पिक है - आप अभी भी ब्राउज़र की built-in आवाज का उपयोग कर सकते हैं।'
              : 'Enter your ElevenLabs API key for high-quality AI voice. This is optional - you can still use the browser\'s built-in voice.'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apikey">
              {language === 'hi' ? 'API Key' : 'API Key'}
            </Label>
            <Input
              id="apikey"
              type="password"
              placeholder={language === 'hi' ? 'अपनी ElevenLabs API key दर्ज करें' : 'Enter your ElevenLabs API key'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              {language === 'hi' 
                ? 'API key कैसे प्राप्त करें:'
                : 'How to get your API key:'
              }
            </p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>
                {language === 'hi' 
                  ? 'ElevenLabs.io पर जाएं और साइन अप करें'
                  : 'Visit ElevenLabs.io and sign up'
                }
              </li>
              <li>
                {language === 'hi' 
                  ? 'Profile → API Keys पर जाएं'
                  : 'Go to Profile → API Keys'
                }
              </li>
              <li>
                {language === 'hi' 
                  ? 'नई API key बनाएं और कॉपी करें'
                  : 'Create a new API key and copy it'
                }
              </li>
            </ol>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto mt-2"
              onClick={() => window.open('https://elevenlabs.io', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {language === 'hi' ? 'ElevenLabs.io खोलें' : 'Open ElevenLabs.io'}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {language === 'hi' ? 'रद्द करें' : 'Cancel'}
          </Button>
          <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
            {language === 'hi' ? 'सेव करें' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};