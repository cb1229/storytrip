import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Trophy, Film, MapPin, Bell, Shield, HelpCircle, LogOut, Award, History } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { useToast } from '../hooks/useToast';
import { useUserStore } from '../store/userStore';
import { UserLevel } from '../components/gamification/UserLevel';
import { AchievementCard } from '../components/gamification/AchievementCard';
import { BookingHistoryCard } from '../components/booking/BookingHistoryCard';
import { BookingHistory } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'bookings'>('overview');

  const { stats } = useUserStore();

  const settingsOptions = [
    { label: 'Notifications', icon: Bell, hasToggle: true },
    { label: 'Privacy & Security', icon: Shield, path: '/settings/privacy' },
    { label: 'Help & Support', icon: HelpCircle, path: '/settings/help' },
  ];

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled');
  };

  // Mock booking history
  const bookingHistory: BookingHistory[] = [
    {
      id: '1',
      tripTitle: 'The Invasion of Dallas',
      narrativeType: 'Rivalry Conquest',
      gameInfo: {
        homeTeam: 'Cowboys',
        awayTeam: 'Eagles',
        date: 'Nov 10, 2024',
        venue: 'AT&T Stadium',
        city: 'Dallas, TX',
      },
      confirmationNumber: 'ST-ABC123XYZ',
      bookedAt: new Date('2024-10-15'),
      travelers: 2,
      total: 1694,
      status: 'completed',
      bookingDetails: {
        flights: {
          departure: {
            airline: 'American Airlines',
            flightNumber: 'AA1234',
            departure: { airport: 'PHL', time: '8:00 AM' },
            arrival: { airport: 'DFW', time: '10:30 AM' },
            price: 450,
          },
          return: {
            airline: 'American Airlines',
            flightNumber: 'AA5678',
            departure: { airport: 'DFW', time: '6:00 PM' },
            arrival: { airport: 'PHL', time: '10:30 PM' },
            price: 450,
          },
        },
        hotel: {
          name: 'Dallas Downtown Hotel',
          address: '123 Main St, Dallas, TX',
          checkIn: 'Nov 9, 3:00 PM',
          checkOut: 'Nov 11, 11:00 AM',
          roomType: 'double',
          price: 320,
        },
        estimatedTotal: 1694,
        daysCount: 3,
        nightsCount: 2,
      },
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header showBack title="Profile" />

      <div className="flex-1 overflow-auto p-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Mike Smith</h2>
          <p className="text-slate-400 mb-2">mike.smith@email.com</p>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-400 text-sm">Philadelphia Eagles Fan</span>
          </div>
        </div>

        {/* User Level Card */}
        <div className="mb-6">
          <UserLevel level={stats.level} points={stats.totalPoints} showProgress />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'achievements'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Award className="w-4 h-4" />
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <MapPin className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">{stats.tripsCompleted}</p>
                <p className="text-slate-400 text-xs">Trips</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <Film className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">{stats.filmsCreated}</p>
                <p className="text-slate-400 text-xs">Films</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">{stats.citiesVisited}</p>
                <p className="text-slate-400 text-xs">Cities</p>
              </div>
            </div>

            {/* Settings */}
            <h3 className="text-white font-semibold mb-3">Settings</h3>
            <div className="space-y-2 mb-6">
              {settingsOptions.map((option, i) => {
                const Icon = option.icon;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (option.hasToggle) {
                        handleToggleNotifications();
                      } else if (option.path) {
                        toast.info('Settings page coming soon!');
                      }
                    }}
                    className="bg-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-slate-400" />
                      <span className="text-white">{option.label}</span>
                    </div>
                    {option.hasToggle ? (
                      <div
                        className={`w-12 h-6 rounded-full transition-all ${
                          notificationsEnabled ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-all ${
                            notificationsEnabled ? 'ml-6' : 'ml-1'
                          }`}
                        />
                      </div>
                    ) : (
                      <Settings className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => navigate('/trips-gallery')}
                className="flex-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-500/30 transition-all"
              >
                <Film className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">View Library</p>
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className="flex-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 hover:bg-amber-500/30 transition-all"
              >
                <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Achievements</p>
              </button>
            </div>
          </>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-3">
            <div className="mb-4">
              <h3 className="text-white text-lg font-bold mb-1">Your Achievements</h3>
              <p className="text-slate-400 text-sm">
                Unlock achievements by completing trips and creating films
              </p>
            </div>
            {stats.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} size="small" />
            ))}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-white text-lg font-bold mb-1">Booking History</h3>
              <p className="text-slate-400 text-sm">View all your past and upcoming trips</p>
            </div>
            {bookingHistory.map((booking) => (
              <BookingHistoryCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={() => {
            toast.success('Logged out successfully');
            setTimeout(() => navigate('/'), 1000);
          }}
          className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-500/30 transition-all mt-6"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};
