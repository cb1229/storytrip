import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Film } from 'lucide-react';
import { AIPrompts } from '../components/capture/AIPrompts';
import { LiveGameScore } from '../components/game/LiveGameScore';
import { GameScore } from '../types';

export const LiveCapturePage: React.FC = () => {
  const navigate = useNavigate();
  const [captureMode, setCaptureMode] = useState<'video' | 'photo' | 'audio'>('video');
  const [showNotification, setShowNotification] = useState(false);
  const [showAIPrompts, setShowAIPrompts] = useState(true);
  const [showLiveScore, setShowLiveScore] = useState(true);

  const gameScore: GameScore = {
    homeTeam: 'Cowboys',
    awayTeam: 'Eagles',
    homeScore: 10,
    awayScore: 14,
    quarter: 'Q2',
    timeRemaining: '8:24',
    status: 'in-progress',
  };

  const handleCapturePrompt = (prompt: string) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Status Bar */}
      <div className="bg-red-500/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-sm font-medium">LIVE: Eagles @ Cowboys</span>
        </div>
        <span className="text-slate-400 text-sm">Chapter 8: The Battle</span>
      </div>

      {/* Camera View Placeholder */}
      <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center relative overflow-auto">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 mx-auto">
            <Camera className="w-12 h-12 text-white/40" />
          </div>
          <p className="text-white/60">Camera Preview</p>
        </div>

        {/* Story Moment Notification */}
        {showNotification && (
          <div className="absolute top-4 left-4 right-4 bg-purple-500/90 rounded-2xl p-4 backdrop-blur animate-pulse">
            <div className="flex items-start gap-3">
              <Film className="w-6 h-6 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">STORY MOMENT</p>
                <p className="text-purple-100 text-sm mt-1">"The Battle Begins"</p>
                <p className="text-purple-200 text-sm mt-2">
                  Kickoff is happening! Capture the energy of the crowd as the game starts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recording Indicator */}
        <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-medium">REC 0:34</span>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-auto bg-slate-900">
        {/* Live Game Score */}
        {showLiveScore && (
          <div className="p-4">
            <LiveGameScore gameScore={gameScore} onCapturePrompt={handleCapturePrompt} />
          </div>
        )}

        {/* AI Story Prompts */}
        {showAIPrompts && (
          <div className="p-4">
            <AIPrompts
              location="AT&T Stadium"
              timeOfDay="evening"
              narrativeType="Rivalry Conquest"
              gameStatus="during"
            />
          </div>
        )}

        {/* Audio Journal Prompt */}
        <div className="p-4">
          <div className="bg-slate-800 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">AUDIO JOURNAL</span>
            </div>
            <p className="text-white mb-3">Halftime. Eagles lead 14-10.</p>
            <p className="text-slate-400 text-sm italic">"How are you feeling right now?"</p>
            <button className="w-full mt-3 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 font-medium flex items-center justify-center gap-2">
              <Mic className="w-5 h-5" />
              Hold to Record
            </button>
          </div>

          {/* Capture Stats */}
          <div className="flex items-center justify-around text-center mb-4">
            <div>
              <p className="text-white font-bold">12</p>
              <p className="text-slate-400 text-xs">Videos</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <p className="text-white font-bold">3</p>
              <p className="text-slate-400 text-xs">Journals</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <p className="text-white font-bold">47</p>
              <p className="text-slate-400 text-xs">Photos</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <p className="text-green-400 font-bold">85%</p>
              <p className="text-slate-400 text-xs">Complete</p>
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCaptureMode('photo')}
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                captureMode === 'photo' ? 'bg-white text-black' : 'bg-slate-800 text-white'
              }`}
            >
              <Camera className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full border-4 border-white" />
            </button>
            <button
              onClick={() => setCaptureMode('audio')}
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                captureMode === 'audio' ? 'bg-white text-black' : 'bg-slate-800 text-white'
              }`}
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-around p-3 border-t border-slate-800 bg-black">
        <button onClick={() => navigate('/')} className="text-slate-500 text-sm">
          Exit
        </button>
        <button className="text-white text-sm font-medium">Shot List</button>
        <button
          onClick={() => navigate('/documentary/demo')}
          className="text-amber-400 text-sm font-medium"
        >
          Preview
        </button>
      </div>
    </div>
  );
};
