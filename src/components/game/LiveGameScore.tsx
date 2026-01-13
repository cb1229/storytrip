import React, { useState, useEffect } from 'react';
import { Radio, TrendingUp, Camera, AlertCircle } from 'lucide-react';
import { GameScore, GameEvent } from '../../types';

interface LiveGameScoreProps {
  gameScore: GameScore;
  onCapturePrompt?: (prompt: string) => void;
}

export const LiveGameScore: React.FC<LiveGameScoreProps> = ({ gameScore, onCapturePrompt }) => {
  const [recentEvents, setRecentEvents] = useState<GameEvent[]>([]);
  const [pulseScore, setPulseScore] = useState(false);

  useEffect(() => {
    // Simulate recent game events
    const events: GameEvent[] = [
      {
        type: 'touchdown',
        team: gameScore.awayTeam,
        description: 'Touchdown! Your team scores!',
        timestamp: new Date(),
        suggestedPrompt: 'Capture your celebration - your team just scored!',
      },
    ];
    setRecentEvents(events);
  }, [gameScore]);

  const isLive = gameScore.status === 'in-progress';
  const isLeading = gameScore.awayScore > gameScore.homeScore;

  return (
    <div className="space-y-3">
      {/* Live Score Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700">
        {/* Live Indicator */}
        {isLive && (
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <Radio className="w-4 h-4 text-red-500" />
              <div className="absolute inset-0 animate-ping">
                <Radio className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <span className="text-red-500 text-sm font-bold">LIVE</span>
            <span className="text-slate-400 text-sm">
              {gameScore.quarter} • {gameScore.timeRemaining}
            </span>
          </div>
        )}

        {/* Teams and Scores */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Away Team */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🦅</span>
            </div>
            <p className="text-white font-bold text-sm">{gameScore.awayTeam}</p>
            <p className="text-slate-400 text-xs">Away</p>
          </div>

          {/* Score */}
          <div className="text-center">
            <div
              className={`text-4xl font-bold mb-1 ${pulseScore ? 'animate-pulse' : ''}`}
            >
              <span className={isLeading ? 'text-green-400' : 'text-white'}>
                {gameScore.awayScore}
              </span>
              <span className="text-slate-600 mx-2">-</span>
              <span className={!isLeading ? 'text-red-400' : 'text-white'}>
                {gameScore.homeScore}
              </span>
            </div>
            {isLive && (
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>{isLeading ? 'Winning!' : 'Keep the faith!'}</span>
              </div>
            )}
          </div>

          {/* Home Team */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-white font-bold text-sm">{gameScore.homeTeam}</p>
            <p className="text-slate-400 text-xs">Home</p>
          </div>
        </div>
      </div>

      {/* Recent Events with Capture Prompts */}
      {isLive && recentEvents.length > 0 && (
        <div className="space-y-2">
          {recentEvents.map((event, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{event.description}</p>
                  {event.suggestedPrompt && (
                    <p className="text-amber-200 text-sm">{event.suggestedPrompt}</p>
                  )}
                </div>
              </div>

              {event.suggestedPrompt && onCapturePrompt && (
                <button
                  onClick={() => onCapturePrompt(event.suggestedPrompt!)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Capture This Moment</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Game Status */}
      {gameScore.status === 'final' && (
        <div
          className={`${
            isLeading
              ? 'bg-green-500/20 border-green-500/30'
              : 'bg-red-500/20 border-red-500/30'
          } border rounded-xl p-4 text-center`}
        >
          <p className={`text-2xl font-bold mb-1 ${isLeading ? 'text-green-400' : 'text-red-400'}`}>
            {isLeading ? '🎉 Victory!' : '💪 Good Fight!'}
          </p>
          <p className="text-slate-300 text-sm">
            {isLeading
              ? 'Your team won! Your documentary will capture this victory.'
              : "Your team's effort was captured beautifully."}
          </p>
        </div>
      )}
    </div>
  );
};
