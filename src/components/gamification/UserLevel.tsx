import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

interface UserLevelProps {
  level: number;
  points: number;
  showProgress?: boolean;
}

export const UserLevel: React.FC<UserLevelProps> = ({ level, points, showProgress = true }) => {
  const pointsInCurrentLevel = points % 200;
  const progressPercent = (pointsInCurrentLevel / 200) * 100;

  return (
    <div className="bg-white border-2 border-nfl-navy rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-nfl-navy flex items-center justify-center">
            <Star className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <p className="text-nfl-darkGray text-sm font-semibold">Your Level</p>
            <p className="text-nfl-navy text-2xl font-black">Level {level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-nfl-darkGray text-sm font-semibold">Total Points</p>
          <p className="text-nfl-red text-xl font-black">{points}</p>
        </div>
      </div>

      {showProgress && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-nfl-red" />
            <p className="text-nfl-navy text-sm font-bold">
              {pointsInCurrentLevel} / 200 XP to Level {level + 1}
            </p>
          </div>
          <div className="h-2 bg-nfl-lightGray rounded-full overflow-hidden">
            <div
              className="h-full bg-nfl-red transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};
