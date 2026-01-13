import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, MapPin, Calendar, Trophy, Search, Filter } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';

interface PastTrip {
  id: string;
  title: string;
  date: string;
  location: string;
  opponent: string;
  result: string;
  thumbnail: string;
  narrativeType: string;
  status: 'ready' | 'processing';
  duration: string;
}

const mockTrips: PastTrip[] = [
  {
    id: '1',
    title: 'The Invasion of Dallas',
    date: 'Nov 10, 2024',
    location: 'Dallas, TX',
    opponent: 'vs Cowboys',
    result: 'W 28-23',
    thumbnail: '🏈',
    narrativeType: 'Rivalry Conquest',
    status: 'ready',
    duration: '3:24',
  },
  {
    id: '2',
    title: 'Frozen Tundra Quest',
    date: 'Jan 15, 2024',
    location: 'Green Bay, WI',
    opponent: 'vs Packers',
    result: 'L 21-24',
    thumbnail: '❄️',
    narrativeType: 'Underdog Story',
    status: 'ready',
    duration: '4:12',
  },
  {
    id: '3',
    title: 'Family Legacy: The Return',
    date: 'Oct 8, 2023',
    location: 'Philadelphia, PA',
    opponent: 'vs Rams',
    result: 'W 31-17',
    thumbnail: '👨‍👩‍👦',
    narrativeType: 'Family Legacy',
    status: 'ready',
    duration: '5:01',
  },
];

export const TripsGalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'wins' | 'losses'>('all');

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'wins' && trip.result.startsWith('W')) ||
      (filterType === 'losses' && trip.result.startsWith('L'));

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockTrips.length,
    wins: mockTrips.filter((t) => t.result.startsWith('W')).length,
    cities: new Set(mockTrips.map((t) => t.location)).size,
    totalDuration: '12m 37s',
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header showBack title="Your Story Library" />

      <div className="flex-1 overflow-auto p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <Film className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.total}</p>
            <p className="text-slate-400 text-xs">Films</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <Trophy className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.wins}</p>
            <p className="text-slate-400 text-xs">Wins</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.cities}</p>
            <p className="text-slate-400 text-xs">Cities</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white">{stats.totalDuration}</p>
            <p className="text-slate-400 text-xs">Total</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search trips..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button className="bg-slate-800 border border-slate-700 rounded-xl px-4 hover:bg-slate-700 transition-all">
            <Filter className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6">
          {['all', 'wins', 'losses'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterType(filter as typeof filterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterType === filter
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => navigate(`/documentary/${trip.id}`)}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer hover:border-amber-500 transition-all"
            >
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-5xl flex-shrink-0">
                  {trip.thumbnail}
                </div>

                {/* Info */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{trip.title}</h3>
                      <p className="text-slate-400 text-sm">{trip.narrativeType}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        trip.result.startsWith('W')
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {trip.result}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{trip.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Ready to Watch</span>
                    </div>
                    <span className="text-slate-400 text-sm">{trip.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No trips found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
