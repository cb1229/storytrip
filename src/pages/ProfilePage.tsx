import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Trophy, Film, MapPin, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { useToast } from '../hooks/useToast';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const stats = [
    { label: 'Trips Completed', value: '2', icon: MapPin },
    { label: 'Films Created', value: '2', icon: Film },
    { label: 'Cities Visited', value: '3', icon: Trophy },
  ];

  const settingsOptions = [
    { label: 'Notifications', icon: Bell, hasToggle: true },
    { label: 'Privacy & Security', icon: Shield, path: '/settings/privacy' },
    { label: 'Help & Support', icon: HelpCircle, path: '/settings/help' },
  ];

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled');
  };

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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-slate-800 rounded-xl p-4 text-center">
                <Icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </div>
            );
          })}
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

        {/* Recent Bookings */}
        <h3 className="text-white font-semibold mb-3">Recent Bookings</h3>
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          {(() => {
            const latestBooking = localStorage.getItem('latestBooking');
            if (latestBooking) {
              const booking = JSON.parse(latestBooking);
              return (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Dallas Trip</span>
                    <span className="text-green-400 font-semibold">${booking.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Confirmation:</span>
                    <span className="text-white font-mono">{booking.confirmationNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Travelers:</span>
                    <span className="text-white">{booking.travelers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-white">{booking.gameDate}</span>
                  </div>
                </div>
              );
            }
            return <p className="text-slate-400 text-sm">No recent bookings</p>;
          })()}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            toast.success('Logged out successfully');
            setTimeout(() => navigate('/'), 1000);
          }}
          className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-500/30 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};
