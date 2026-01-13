import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, Circle, Plane, MapPin, Film } from 'lucide-react';

interface TripTimelineProps {
  gameDate: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

export const TripTimeline: React.FC<TripTimelineProps> = ({ gameDate, status }) => {
  const [daysUntil, setDaysUntil] = useState(0);
  const [hoursUntil, setHoursUntil] = useState(0);

  useEffect(() => {
    const calculateTimeUntil = () => {
      const now = new Date();
      const game = new Date(gameDate);
      const diff = game.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setDaysUntil(Math.max(0, days));
      setHoursUntil(Math.max(0, hours));
    };

    calculateTimeUntil();
    const interval = setInterval(calculateTimeUntil, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [gameDate]);

  const milestones = [
    {
      id: 'booking',
      title: 'Booking Confirmed',
      icon: CheckCircle,
      completed: true,
      color: 'text-green-400',
    },
    {
      id: 'departure',
      title: 'Depart for Trip',
      icon: Plane,
      completed: status !== 'upcoming',
      color: 'text-blue-400',
    },
    {
      id: 'game',
      title: 'Game Day!',
      icon: MapPin,
      completed: status === 'completed',
      color: 'text-amber-400',
    },
    {
      id: 'documentary',
      title: 'Documentary Ready',
      icon: Film,
      completed: status === 'completed',
      color: 'text-purple-400',
    },
  ];

  const getStatusMessage = () => {
    if (status === 'completed') {
      return 'Trip completed! Your documentary is ready.';
    }
    if (status === 'in-progress') {
      return 'Trip in progress - enjoy the experience!';
    }
    if (daysUntil === 0) {
      return `Game day is today! ${hoursUntil} hours to go.`;
    }
    if (daysUntil === 1) {
      return 'Game day is tomorrow!';
    }
    return `${daysUntil} days until game day`;
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
      {/* Countdown */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <span className="text-slate-400 text-sm">Trip Timeline</span>
        </div>

        {status === 'upcoming' && (
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{daysUntil}</div>
              <div className="text-slate-400 text-xs">Days</div>
            </div>
            <div className="text-2xl text-slate-600">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{hoursUntil}</div>
              <div className="text-slate-400 text-xs">Hours</div>
            </div>
          </div>
        )}

        <p className="text-amber-400 text-sm font-medium">{getStatusMessage()}</p>
      </div>

      {/* Milestones */}
      <div className="space-y-3">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isLast = index === milestones.length - 1;

          return (
            <div key={milestone.id} className="relative">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  {milestone.completed ? (
                    <div className={`w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center ${milestone.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center">
                      <Circle className="w-4 h-4 text-slate-600" />
                    </div>
                  )}

                  {/* Connector line */}
                  {!isLast && (
                    <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                      milestone.completed ? 'bg-slate-600' : 'bg-slate-700'
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className={`font-medium ${
                    milestone.completed ? 'text-white' : 'text-slate-500'
                  }`}>
                    {milestone.title}
                  </p>
                </div>

                {/* Status */}
                {milestone.completed && (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>
            {milestones.filter((m) => m.completed).length}/{milestones.length}
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
            style={{
              width: `${(milestones.filter((m) => m.completed).length / milestones.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
