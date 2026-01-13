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
    <div className="flex flex-col h-full bg-nfl-lightGray">
      <Header showMenu showNotifications />

      <div className="flex-1 overflow-auto p-4">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-nfl-navy mb-1 tracking-tight">Welcome back, Mike</h1>
          <p className="text-nfl-darkGray font-medium">Ready for your next story?</p>
        </div>

        {/* Past Stories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-nfl-navy tracking-tight">YOUR STORIES</h2>
            <button
              onClick={() => navigate('/trips-gallery')}
              className="text-nfl-red text-sm font-bold hover:text-nfl-redDark transition-all"
            >
              View all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pastTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/documentary/${trip.id}`)}
                className="flex-shrink-0 w-36 bg-white rounded-lg overflow-hidden shadow-card cursor-pointer hover:shadow-card-hover transition-all"
              >
                <div className="h-20 bg-nfl-navy flex items-center justify-center text-4xl">
                  {trip.thumbnail}
                </div>
                <div className="p-3">
                  <p className="text-nfl-navy text-sm font-bold truncate">{trip.title}</p>
                  <p className="text-nfl-darkGray text-xs font-medium">{trip.date}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Film className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 text-xs font-semibold">Ready</span>
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => navigate('/select-story')}
              className="flex-shrink-0 w-36 bg-white/50 rounded-lg border-2 border-dashed border-nfl-mediumGray flex flex-col items-center justify-center cursor-pointer hover:border-nfl-red hover:bg-white transition-all"
            >
              <Plus className="w-8 h-8 text-nfl-darkGray mb-2" />
              <span className="text-nfl-darkGray text-sm font-semibold">New Story</span>
            </div>
          </div>
        </div>

        {/* Start New Trip */}
        <div className="bg-nfl-red rounded-lg p-5 mb-6 shadow-card">
          <h2 className="text-xl font-black text-white mb-2 tracking-tight">START A NEW STORY</h2>
          <p className="text-white/90 text-sm font-medium mb-4">Where's your next away game?</p>
          <div
            onClick={() => navigate('/select-story')}
            className="bg-white rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-nfl-lightGray transition-all"
          >
            <MapPin className="w-5 h-5 text-nfl-navy" />
            <span className="text-nfl-darkGray font-semibold">Search teams, cities...</span>
          </div>
        </div>

        {/* Upcoming Games */}
        <div>
          <h2 className="text-xl font-black text-nfl-navy mb-3 tracking-tight">UPCOMING MATCHUPS</h2>
          <div className="space-y-3">
            {upcomingGames.map((game, i) => (
              <div
                key={i}
                onClick={() => navigate('/select-story')}
                className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-card-hover transition-all shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-nfl-navy flex items-center justify-center">
                    <span className="text-2xl">🏈</span>
                  </div>
                  <div>
                    <p className="text-nfl-navy font-bold text-base">{game.opponent}</p>
                    <p className="text-nfl-darkGray text-sm font-medium">
                      {game.date} • {game.location}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-nfl-red" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
