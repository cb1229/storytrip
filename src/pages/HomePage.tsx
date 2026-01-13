import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Film, ChevronRight } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';

const pastTrips = [
  {
    id: 1,
    title: 'The Invasion of Dallas',
    date: 'Nov 2024',
    team: 'vs Cowboys',
    result: 'W 28-23',
    thumbnail: '🏈',
    status: 'ready' as const,
  },
  {
    id: 2,
    title: 'Frozen Tundra Quest',
    date: 'Jan 2024',
    team: 'vs Packers',
    result: 'L 21-24',
    thumbnail: '❄️',
    status: 'ready' as const,
  },
];

const upcomingGames = [
  { opponent: '@ Giants', date: 'Dec 22', location: 'New York' },
  { opponent: '@ Commanders', date: 'Jan 5', location: 'Washington' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header showMenu showNotifications />

      <div className="flex-1 overflow-auto p-4">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Mike</h1>
          <p className="text-slate-400">Ready for your next story?</p>
        </div>

        {/* Past Stories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Your Stories</h2>
            <button
              onClick={() => navigate('/trips-gallery')}
              className="text-amber-400 text-sm hover:text-amber-300 transition-all"
            >
              View all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pastTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/documentary/${trip.id}`)}
                className="flex-shrink-0 w-36 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 cursor-pointer hover:border-amber-500 transition-all"
              >
                <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl">
                  {trip.thumbnail}
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{trip.title}</p>
                  <p className="text-slate-400 text-xs">{trip.date}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Film className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">Ready</span>
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => navigate('/select-story')}
              className="flex-shrink-0 w-36 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-all"
            >
              <Plus className="w-8 h-8 text-slate-500 mb-2" />
              <span className="text-slate-500 text-sm">New Story</span>
            </div>
          </div>
        </div>

        {/* Start New Trip */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">Start a New Story</h2>
          <p className="text-slate-300 text-sm mb-4">Where's your next away game?</p>
          <div
            onClick={() => navigate('/select-story')}
            className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-all"
          >
            <MapPin className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Search teams, cities...</span>
          </div>
        </div>

        {/* Upcoming Games */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Upcoming Matchups</h2>
          <div className="space-y-2">
            {upcomingGames.map((game, i) => (
              <div
                key={i}
                onClick={() => navigate('/select-story')}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    🏈
                  </div>
                  <div>
                    <p className="text-white font-medium">{game.opponent}</p>
                    <p className="text-slate-400 text-sm">
                      {game.date} • {game.location}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
