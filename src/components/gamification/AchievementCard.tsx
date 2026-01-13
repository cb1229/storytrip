import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
  size?: 'small' | 'large';
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, size = 'small' }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const progress = achievement.progress || 0;
  const target = achievement.target || 1;
  const progressPercent = Math.min((progress / target) * 100, 100);

  if (size === 'small') {
    return (
      <div
        className={`relative rounded-xl p-3 border ${
          isUnlocked
            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30'
            : 'bg-slate-800 border-slate-700'
        }`}
      >
        {!isUnlocked && (
          <div className="absolute top-2 right-2">
            <Lock className="w-4 h-4 text-slate-600" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-2">
          <div
            className={`text-3xl ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}
          >
            {achievement.icon}
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
              {achievement.title}
            </p>
            <p className="text-slate-400 text-xs">{achievement.description}</p>
          </div>
        </div>

        {!isUnlocked && achievement.target && (
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span>
                {progress}/{target}
              </span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {isUnlocked && (
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Trophy className="w-3 h-3" />
            <span>Unlocked!</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl p-6 border ${
        isUnlocked
          ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      {!isUnlocked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-6 h-6 text-slate-600" />
        </div>
      )}

      <div className="text-center mb-4">
        <div className={`text-6xl mb-3 ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
          {achievement.title}
        </h3>
        <p className="text-slate-400 text-sm">{achievement.description}</p>
      </div>

      {!isUnlocked && achievement.target && (
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span className="font-medium">
              {progress}/{target}
            </span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {isUnlocked && (
        <div className="flex items-center justify-center gap-2 text-amber-400 font-medium">
          <Trophy className="w-5 h-5" />
          <span>Achievement Unlocked!</span>
        </div>
      )}
    </div>
  );
};
