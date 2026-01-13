import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Swords, Heart, Trophy, BookOpen, Star, Sparkles } from 'lucide-react';
import { Header } from '../components/common/Header';
import { narratives } from '../data/narratives';
import { useTripStore } from '../store/tripStore';

const iconMap = {
  Swords,
  Heart,
  Trophy,
  BookOpen,
  Star,
  Sparkles,
};

export const StorySelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedNarrative, setGameInfo } = useTripStore();

  const handleSelectNarrative = (narrativeId: string) => {
    setSelectedNarrative(narrativeId);
    // Set sample game info
    setGameInfo({
      homeTeam: 'Cowboys',
      awayTeam: 'Eagles',
      date: 'November 10, 2024',
      venue: 'AT&T Stadium',
      city: 'Dallas, TX',
    });
    navigate(`/trip/${narrativeId}`);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header title="Eagles @ Cowboys" subtitle="November 10, 2024" showBack />

      <div className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-2">What's Your Story?</h1>
        <p className="text-slate-400 mb-6">Choose the narrative that fits your journey</p>

        <div className="space-y-3">
          {narratives.map((narrative) => {
            const Icon = iconMap[narrative.iconName as keyof typeof iconMap];
            return (
              <div
                key={narrative.id}
                onClick={() => handleSelectNarrative(narrative.id)}
                className={`bg-gradient-to-r ${narrative.color} p-0.5 rounded-2xl cursor-pointer transform hover:scale-[1.02] transition-all`}
              >
                <div className="bg-slate-900 rounded-2xl p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${narrative.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{narrative.title}</h3>
                      <p className="text-slate-300 text-sm italic mb-1">{narrative.tagline}</p>
                      <p className="text-slate-400 text-sm">{narrative.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
