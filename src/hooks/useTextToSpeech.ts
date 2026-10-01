import { useState, useCallback } from 'react';

interface TextToSpeechOptions {
  apiKey?: string;
  voiceId?: string;
  model?: string;
}

interface SpeechState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
}

export const useTextToSpeech = (options: TextToSpeechOptions = {}) => {
  const [state, setState] = useState<SpeechState>({
    isLoading: false,
    isPlaying: false,
    error: null,
  });

  const speak = useCallback(async (text: string, language: 'en' | 'hi' = 'en') => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // If ElevenLabs API key is provided, use ElevenLabs
      if (options.apiKey) {
        const voiceId = options.voiceId || 'EXAVITQu4vr4xnSDxMaL'; // Sarah voice
        const model = options.model || 'eleven_multilingual_v2';

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': options.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: model,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate speech');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));

        audio.onended = () => {
          setState(prev => ({ ...prev, isPlaying: false }));
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setState(prev => ({ ...prev, isPlaying: false, error: 'Failed to play audio' }));
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      } else {
        // Fallback to browser's built-in speech synthesis
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // Set language based on the language parameter
          utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 1;

          setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));

          utterance.onend = () => {
            setState(prev => ({ ...prev, isPlaying: false }));
          };

          utterance.onerror = () => {
            setState(prev => ({ ...prev, isPlaying: false, error: 'Speech synthesis failed' }));
          };

          speechSynthesis.speak(utterance);
        } else {
          throw new Error('Speech synthesis not supported');
        }
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, [options.apiKey, options.voiceId, options.model]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  return {
    speak,
    stop,
    ...state,
  };
};