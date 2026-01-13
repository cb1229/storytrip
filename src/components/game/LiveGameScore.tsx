import React, { useState, useEffect } from 'react';
import { Radio, TrendingUp, Camera, AlertCircle } from 'lucide-react';
import { GameScore, GameEvent } from '../../types';

interface LiveGameScoreProps {
  gameScore: GameScore;
  onCapturePrompt?: (prompt: string) => void;
}

export const LiveGameScore: React.FC<LiveGameScoreProps> = ({ gameScore, onCapturePrompt }) => {
  const [recentEvents, setRecentEvents] = useState<GameEvent[]>([]);

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
      <div className="bg-white rounded-lg p-4 shadow-card">
        {/* Live Indicator */}
        {isLive && (
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <Radio className="w-4 h-4 text-red-500" />
              <div className="absolute inset-0 animate-ping">
                <Radio className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <span className="text-red-500 text-sm font-black">LIVE</span>
            <span className="text-nfl-darkGray text-sm font-semibold">
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
            <p className="text-nfl-navy font-black text-sm">{gameScore.awayTeam}</p>
            <p className="text-nfl-darkGray text-xs font-semibold">Away</p>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-4xl font-black mb-1">
              <span className={isLeading ? 'text-green-600' : 'text-nfl-navy'}>
                {gameScore.awayScore}
              </span>
              <span className="text-nfl-mediumGray mx-2">-</span>
              <span className={!isLeading ? 'text-nfl-red' : 'text-nfl-navy'}>
                {gameScore.homeScore}
              </span>
            </div>
            {isLive && (
              <div className="flex items-center justify-center gap-1 text-green-600 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span className="font-bold">{isLeading ? 'Winning!' : 'Keep the faith!'}</span>
              </div>
            )}
          </div>

          {/* Home Team */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-nfl-navy font-black text-sm">{gameScore.homeTeam}</p>
            <p className="text-nfl-darkGray text-xs font-semibold">Home</p>
          </div>
        </div>
      </div>

      {/* Recent Events with Capture Prompts */}
      {isLive && recentEvents.length > 0 && (
        <div className="space-y-2">
          {recentEvents.map((event, index) => (
            <div
              key={index}
              className="bg-nfl-red/10 border-2 border-nfl-red rounded-lg p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-nfl-red flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-nfl-navy font-bold mb-1">{event.description}</p>
                  {event.suggestedPrompt && (
                    <p className="text-nfl-darkGray text-sm font-medium">{event.suggestedPrompt}</p>
                  )}
                </div>
              </div>

              {event.suggestedPrompt && onCapturePrompt && (
                <button
                  onClick={() => onCapturePrompt(event.suggestedPrompt!)}
                  className="w-full bg-nfl-red rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-nfl-redDark transition-all shadow-card"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-white font-black">CAPTURE THIS MOMENT</span>
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
              ? 'bg-green-50 border-2 border-green-600'
              : 'bg-red-50 border-2 border-red-600'
          } rounded-lg p-4 text-center`}
        >
          <p className={`text-2xl font-black mb-1 ${isLeading ? 'text-green-600' : 'text-red-600'}`}>
            {isLeading ? '🎉 VICTORY!' : '💪 GOOD FIGHT!'}
          </p>
          <p className="text-nfl-darkGray text-sm font-semibold">
            {isLeading
              ? 'Your team won! Your documentary will capture this victory.'
              : "Your team's effort was captured beautifully."}
          </p>
        </div>
      )}
    </div>
  );
};
