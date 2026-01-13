import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

interface UserLevelProps {
  level: number;
  points: number;
  showProgress?: boolean;
}

export const UserLevel: React.FC<UserLevelProps> = ({ level, points, showProgress = true }) => {
  const pointsForNextLevel = level * 200;
  const pointsInCurrentLevel = points % 200;
  const progressPercent = (pointsInCurrentLevel / 200) * 100;

  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Your Level</p>
            <p className="text-white text-2xl font-bold">Level {level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Total Points</p>
          <p className="text-purple-400 text-xl font-bold">{points}</p>
        </div>
      </div>

      {showProgress && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <p className="text-slate-300 text-sm">
              {pointsInCurrentLevel} / 200 XP to Level {level + 1}
            </p>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};
