import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Mic } from 'lucide-react';

interface AIPromptsProps {
  location?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  narrativeType: string;
  gameStatus?: 'before' | 'during' | 'after';
}

export const AIPrompts: React.FC<AIPromptsProps> = ({
  location,
  timeOfDay,
  gameStatus = 'before',
}) => {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);

  const generatePrompts = () => {
    const prompts: Record<string, Record<string, string[]>> = {
      before: {
        morning: [
          "Show us your game day outfit! What are you wearing to represent?",
          "Capture your pre-game breakfast ritual",
          "Film your journey to the stadium - what's the vibe?",
        ],
        afternoon: [
          "You're near the stadium - capture the atmosphere building!",
          "Show us the tailgate scene - what makes your crew special?",
          "Film your pre-game predictions - how will it go down?",
        ],
        evening: [
          "The stadium lights are on - capture that first view",
          "Film your entrance - how does it feel stepping into enemy territory?",
          "Show us the pre-game energy in your section",
        ],
        night: [],
      },
      during: {
        morning: [],
        afternoon: [],
        evening: [
          "Your team just scored - capture the celebration!",
          "Film the crowd's reaction - what's the energy like?",
          "Show us your game face - how are you feeling right now?",
        ],
        night: [],
      },
      after: {
        morning: [],
        afternoon: [],
        evening: [
          "Capture your immediate post-game reaction",
          "Film the walk back - what's everyone saying?",
          "Show us the celebration (or the comeback plan)",
        ],
        night: [
          "Capture the post-game scene - where are you headed?",
          "Film your final thoughts on the experience",
          "Show us one last view of the stadium lit up at night",
        ],
      },
    };

    const timePrompts = prompts[gameStatus]?.[timeOfDay] || [];
    return timePrompts;
  };

  useEffect(() => {
    const prompts = generatePrompts();
    if (prompts.length > 0) {
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }
  }, [location, timeOfDay, gameStatus]);

  const handleNewPrompt = () => {
    const prompts = generatePrompts();
    const currentIndex = prompts.indexOf(currentPrompt);
    const nextIndex = (currentIndex + 1) % prompts.length;
    setCurrentPrompt(prompts[nextIndex]);
  };

  const handleVoicePrompt = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      // Simulate voice recognition
    }, 2000);
  };

  if (!currentPrompt) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Context Info */}
      <div className="flex items-center gap-4 text-nfl-darkGray text-sm">
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">{location}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className="capitalize font-semibold">{timeOfDay}</span>
        </div>
      </div>

      {/* AI Prompt Card */}
      <div className="bg-nfl-navy rounded-lg p-4 shadow-card">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-nfl-red flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-nfl-red text-xs font-black mb-1">AI STORY GUIDE</p>
            <p className="text-white text-lg font-bold leading-snug">{currentPrompt}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleNewPrompt}
            className="flex-1 bg-white hover:bg-nfl-lightGray rounded-lg py-3 px-4 text-nfl-navy font-black transition-all"
          >
            NEXT PROMPT
          </button>
          <button
            onClick={handleVoicePrompt}
            className={`bg-white hover:bg-nfl-lightGray rounded-lg py-3 px-4 transition-all ${
              isListening ? 'animate-pulse' : ''
            }`}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-nfl-red' : 'text-nfl-navy'}`} />
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-lg p-3 shadow-card">
        <p className="text-nfl-darkGray text-xs text-center font-semibold">
          💡 Pro tip: Keep clips under 30 seconds for the best documentary flow
        </p>
      </div>
    </div>
  );
};
